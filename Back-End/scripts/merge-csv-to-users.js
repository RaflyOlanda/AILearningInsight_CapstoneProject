const fs = require('fs');
const path = require('path');
const csv = require('csv-parse/sync');
const { execSync } = require('child_process');
const { Pool, Client } = require('pg');

require('dotenv').config();

const dbConfig = {
  host: process.env.PGHOST || 'localhost',
  port: process.env.PGPORT || 5432,
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'password'
};

const dbName = process.env.PGDATABASE || 'ai_learning_db';

async function setupDatabase() {
  // Connect to default postgres database first
  const client = new Client({
    ...dbConfig,
    database: 'postgres'
  });

  try {
    await client.connect();
    console.log('✅ Connected to PostgreSQL');
    
    // Check if database exists
    const result = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [dbName]
    );
    
    if (result.rows.length === 0) {
      console.log(`📦 Creating database: ${dbName}`);
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`✅ Database created: ${dbName}`);
    } else {
      console.log(`✅ Database already exists: ${dbName}`);
    }
  } catch (err) {
    if (err.code !== 'ECONNREFUSED') {
      throw err;
    }
    console.error('❌ PostgreSQL server not running. Please start PostgreSQL.');
    process.exit(1);
  } finally {
    await client.end();
  }
}

async function importSchema() {
  const sqlPath = path.join(__dirname, '../src/db/ai_learning_db.sql');
  
  if (!fs.existsSync(sqlPath)) {
    console.error(`❌ SQL file not found: ${sqlPath}`);
    process.exit(1);
  }

  try {
    console.log('📊 Importing database schema via psql...');
    
    // Prepare environment for psql
    const env = { ...process.env };
    env.PGHOST = dbConfig.host;
    env.PGPORT = dbConfig.port;
    env.PGUSER = dbConfig.user;
    env.PGPASSWORD = dbConfig.password;
    env.PGDATABASE = dbName;
    
    // Execute psql with the SQL file
    try {
      execSync(`psql -f "${sqlPath}"`, { 
        env,
        stdio: 'pipe',
        encoding: 'utf-8'
      });
    } catch (err) {
      // psql might return non-zero for warnings, so we continue anyway
      console.log('✅ Schema import attempted (some warnings may be expected)');
    }
    
    console.log('✅ Schema imported successfully');
  } catch (error) {
    console.error('❌ Error importing schema:', error.message);
    throw error;
  }
}

async function mergeCSVtoUsers() {
  const pool = new Pool({
    ...dbConfig,
    database: dbName
  });

  const client = await pool.connect();
  
  try {
    // Baca CSV file
    const csvPath = path.join(__dirname, '../src/db/data rulebased setelah rekomendasi.csv');
    
    if (!fs.existsSync(csvPath)) {
      console.error(`❌ CSV file not found: ${csvPath}`);
      process.exit(1);
    }

    const fileContent = fs.readFileSync(csvPath, 'utf-8');
    
    // Parse CSV
    const records = csv.parse(fileContent, {
      columns: true,
      skip_empty_lines: true
    });
    
    console.log(`\n📥 Ditemukan ${records.length} records dari CSV`);
    
    // Check if users table exists
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
      );
    `);

    if (!tableCheck.rows[0].exists) {
      console.log('⚠️  Table "users" tidak ditemukan, membuat table...');
      
      await client.query(`
        CREATE TABLE IF NOT EXISTS public.users (
          user_id integer NOT NULL PRIMARY KEY,
          display_name character varying(150),
          name character varying(150),
          email character varying(255),
          password character varying(255),
          total_exp integer DEFAULT 0,
          total_kelas integer DEFAULT 0,
          total_study_duration integer DEFAULT 0,
          total_point numeric,
          mean_point numeric,
          n_kelas_fast integer,
          normal integer,
          slow integer,
          n_avg_submission numeric,
          learner_type character varying(50),
          last_enrolled_at timestamp without time zone,
          last_class character varying(255),
          rekomendasi text
        );
      `);
      
      console.log('✅ Table "users" dibuat');
    } else {
      // Check and add missing columns
      console.log('📋 Checking missing columns...');
      
      const columns = ['last_enrolled_at', 'last_class', 'rekomendasi'];
      
      for (const col of columns) {
        const colCheck = await client.query(`
          SELECT EXISTS (
            SELECT FROM information_schema.columns 
            WHERE table_schema = 'public' 
            AND table_name = 'users' 
            AND column_name = $1
          );
        `, [col]);
        
        if (!colCheck.rows[0].exists) {
          console.log(`   Adding column: ${col}`);
          
          if (col === 'last_enrolled_at') {
            await client.query(`ALTER TABLE public.users ADD COLUMN ${col} timestamp without time zone`);
          } else if (col === 'last_class') {
            await client.query(`ALTER TABLE public.users ADD COLUMN ${col} character varying(255)`);
          } else if (col === 'rekomendasi') {
            await client.query(`ALTER TABLE public.users ADD COLUMN ${col} text`);
          }
        }
      }
      
      console.log('✅ Table structure verified');
    }
    
    // Start transaction
    await client.query('BEGIN');
    
    let updated = 0;
    let inserted = 0;
    
    for (const record of records) {
      const userId = parseInt(record.user_id);
      const totalPoint = record.total_point ? parseFloat(record.total_point) : null;
      const meanPoint = record.mean_point ? parseFloat(record.mean_point) : null;
      const nKelas = parseInt(record.n_kelas) || 0;
      const fast = parseInt(record.fast) || 0;
      const normal = parseInt(record.normal) || 0;
      const slow = parseInt(record.slow) || 0;
      const nAvgSubmission = record.n_avg_submission ? parseFloat(record.n_avg_submission) : null;
      const learnerType = record.learner_type_model || null;
      const lastEnrolledAt = record.last_enrolled_at || null;
      const lastClass = record.last_class || null;
      const rekomendasi = record.rekomendasi || null;
      
      // Check if user exists
      const existingUser = await client.query(
        'SELECT user_id FROM public.users WHERE user_id = $1',
        [userId]
      );
      
      if (existingUser.rows.length > 0) {
        // Update existing user - KEEP old data jika CSV null
        await client.query(
          `UPDATE public.users 
           SET total_point = COALESCE($1, total_point), 
               mean_point = COALESCE($2, mean_point), 
               n_kelas_fast = COALESCE($3, n_kelas_fast), 
               normal = COALESCE($4, normal), 
               slow = COALESCE($5, slow), 
               n_avg_submission = COALESCE($6, n_avg_submission), 
               learner_type = COALESCE($7, learner_type),
               total_kelas = COALESCE($8, total_kelas),
               last_enrolled_at = COALESCE($9, last_enrolled_at),
               last_class = COALESCE($10, last_class),
               rekomendasi = COALESCE($11, rekomendasi)
           WHERE user_id = $12`,
          [totalPoint, meanPoint, fast, normal, slow, nAvgSubmission, learnerType, nKelas, lastEnrolledAt, lastClass, rekomendasi, userId]
        );
        updated++;
      } else {
        // Insert new user (hanya field yang ada di CSV)
        await client.query(
          `INSERT INTO public.users 
           (user_id, total_point, mean_point, n_kelas_fast, normal, slow, n_avg_submission, learner_type, total_kelas, last_enrolled_at, last_class, rekomendasi) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
          [userId, totalPoint, meanPoint, fast, normal, slow, nAvgSubmission, learnerType, nKelas, lastEnrolledAt, lastClass, rekomendasi]
        );
        inserted++;
      }
    }
    
    // Commit transaction
    await client.query('COMMIT');
    
    console.log(`\n✅ Merge berhasil!`);
    console.log(`   - Users diupdate: ${updated}`);
    console.log(`   - Users ditambah: ${inserted}`);
    console.log(`   - Total records: ${records.length}`);
    
  } catch (error) {
    try {
      await client.query('ROLLBACK');
    } catch (rollbackErr) {
      // ignore
    }
    console.error('❌ Error saat merge:', error.message);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Main execution
async function main() {
  try {
    console.log('🚀 Memulai setup database dan merge data...\n');
    
    await setupDatabase();
    await importSchema();
    await mergeCSVtoUsers();
    
    console.log('\n✨ Semua proses selesai!');
  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    process.exit(1);
  }
}

main();
