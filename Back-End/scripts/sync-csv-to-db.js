const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const { parse } = require('csv-parse');
const Pool = require('../src/services/Pool');

/**
 * Script to sync CSV data "data rulebased setelah rekomendasi.csv" to PostgreSQL users table
 */

async function syncCsvToDb() {
  const csvPath = path.join(__dirname, '../src/db/data rulebased setelah rekomendasi.csv');
  
  if (!fs.existsSync(csvPath)) {
    console.error(`❌ CSV file not found: ${csvPath}`);
    process.exit(1);
  }

  // Verify environment variables
  console.log('🔍 Checking environment variables...');
  console.log(`   PGHOST: ${process.env.PGHOST}`);
  console.log(`   PGUSER: ${process.env.PGUSER}`);
  console.log(`   PGDATABASE: ${process.env.PGDATABASE}`);
  console.log(`   PGPASSWORD: ${process.env.PGPASSWORD ? '***' : '❌ NOT SET'}`);
  console.log(`   PGPORT: ${process.env.PGPORT}`);

  if (!process.env.PGHOST || !process.env.PGDATABASE || !process.env.PGUSER || !process.env.PGPASSWORD) {
    console.error('\n❌ Missing environment variables. Please check .env file.');
    console.error('   Required: PGHOST, PGDATABASE, PGUSER, PGPASSWORD');
    process.exit(1);
  }

  console.log('\n✅ Environment variables OK\n');

  let client;
  try {
    client = await Pool.connect();
    console.log('✅ Connected to database\n');
  } catch (err) {
    console.error('❌ Failed to connect to database:');
    console.error(`   ${err.message}`);
    process.exit(1);
  }

  try {
    // Check if rekomendasi column exists, if not add it
    console.log('📋 Checking database schema...');
    const rekoColCheck = await client.query(`
      SELECT column_name FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'rekomendasi'
    `);
    
    if (rekoColCheck.rows.length === 0) {
      console.log('  Adding "rekomendasi" column...');
      await client.query(`ALTER TABLE public.users ADD COLUMN rekomendasi TEXT`);
    }

    const lastClassColCheck = await client.query(`
      SELECT column_name FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'last_class'
    `);
    
    if (lastClassColCheck.rows.length === 0) {
      console.log('  Adding "last_class" column...');
      await client.query(`ALTER TABLE public.users ADD COLUMN last_class VARCHAR(500)`);
    }
    console.log('✅ Schema check complete\n');

    // Read and parse CSV
    console.log('📖 Reading CSV file...');
    
    return new Promise(async (resolve, reject) => {
      let rowCount = 0;
      let updateCount = 0;
      let errorCount = 0;
      let isProcessing = false;
      let processingQueue = [];
      
      const processQueue = async () => {
        if (isProcessing || processingQueue.length === 0) return;
        
        isProcessing = true;
        const batch = processingQueue.splice(0, 10); // Process 10 at a time
        
        for (const row of batch) {
          const userId = parseInt(row.user_id);
          const totalPoint = parseInt(row.total_point) || null;
          const meanPoint = parseFloat(row.mean_point) || null;
          const nKelas = parseInt(row.n_kelas) || null;
          const fast = parseInt(row.fast) || null;
          const normal = parseInt(row.normal) || null;
          const slow = parseInt(row.slow) || null;
          const nAvgSubmission = parseFloat(row.n_avg_submission) || null;
          const learnerType = row.learner_type_model || null;
          const rekomendasi = row.rekomendasi || null;
          const lastClass = row.last_class || null;

          const updateQuery = `
            UPDATE public.users 
            SET 
              total_point = COALESCE($1, total_point),
              mean_point = COALESCE($2, mean_point),
              total_kelas = COALESCE($3, total_kelas),
              n_kelas_fast = COALESCE($4, n_kelas_fast),
              normal = COALESCE($5, normal),
              slow = COALESCE($6, slow),
              n_avg_submission = COALESCE($7, n_avg_submission),
              learner_type = COALESCE($8, learner_type),
              rekomendasi = COALESCE($9, rekomendasi),
              last_class = COALESCE($10, last_class)
            WHERE user_id = $11
          `;

          try {
            const result = await client.query(updateQuery, [
              totalPoint,
              meanPoint,
              nKelas,
              fast,
              normal,
              slow,
              nAvgSubmission,
              learnerType,
              rekomendasi,
              lastClass,
              userId
            ]);
            if (result.rowCount > 0) {
              updateCount++;
            }
          } catch (err) {
            console.error(`  ❌ Error updating user ${userId}:`, err.message);
            errorCount++;
          }
        }
        
        isProcessing = false;
        
        // Log progress
        if ((updateCount + errorCount) % 50 === 0) {
          console.log(`  ⏳ Progress: ${updateCount + errorCount} processed...`);
        }
        
        // Process next batch if queue not empty
        if (processingQueue.length > 0) {
          setImmediate(processQueue);
        }
      };
      
      fs.createReadStream(csvPath)
        .pipe(parse({
          columns: true,
          skip_empty_lines: true,
        }))
        .on('data', (row) => {
          rowCount++;
          processingQueue.push(row);
          processQueue(); // Trigger processing
        })
        .on('end', async () => {
          // Wait for all remaining items to process
          while (processingQueue.length > 0 || isProcessing) {
            await new Promise(resolve => setImmediate(resolve));
          }
          
          console.log(`\n✅ Sync completed!`);
          console.log(`📊 Total rows: ${rowCount}`);
          console.log(`✅ Updated: ${updateCount} users`);
          console.log(`⚠️  Errors: ${errorCount} users`);
          client.release();
          resolve();
        })
        .on('error', (err) => {
          console.error('❌ CSV parsing error:', err);
          client.release();
          reject(err);
        });
    });
  } catch (err) {
    console.error('❌ Database error:', err);
    client.release();
    throw err;
  }
}

// Run sync
syncCsvToDb()
  .then(() => {
    console.log('\n✅ All done!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('\n❌ Fatal error:', err);
    process.exit(1);
  });
