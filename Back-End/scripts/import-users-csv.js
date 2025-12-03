#!/usr/bin/env node
/*
  Import user model outputs from a CSV into users table.
  - Adds columns if missing: learner_type_model TEXT, rekomendasi TEXT, last_enrolled_at TIMESTAMP NULL, last_class TEXT
  - Matches rows by user_id (preferred) or email if present in CSV

  Usage:
    node scripts/import-users-csv.js <path-to-csv>

  CSV columns (flexible):
    - user_id (number) OR email (string)
    - learner_type_model (string)
    - rekomendasi (string)
    - last_enrolled_at (ISO date or yyyy-mm-dd) [optional]
    - last_class (string) [optional]
*/

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const pool = require('../src/services/Pool');

function usageAndExit(msg) {
  if (msg) console.error(`[error] ${msg}`);
  console.log('Usage: node scripts/import-users-csv.js <path-to-csv>');
  process.exit(msg ? 1 : 0);
}

(async () => {
  try {
    const csvPath = process.argv[2];
    if (!csvPath) usageAndExit('CSV path is required');

    const absPath = path.resolve(csvPath);
    if (!fs.existsSync(absPath)) usageAndExit(`CSV not found: ${absPath}`);

    console.log(`[info] Using CSV: ${absPath}`);

    // Ensure columns exist
    const alterSql = `
      ALTER TABLE IF EXISTS users
        ADD COLUMN IF NOT EXISTS learner_type_model TEXT,
        ADD COLUMN IF NOT EXISTS rekomendasi TEXT,
        ADD COLUMN IF NOT EXISTS last_enrolled_at TIMESTAMP NULL,
        ADD COLUMN IF NOT EXISTS last_class TEXT;
    `;
    await pool.query(alterSql);
    console.log('[info] Ensured columns exist on users table');

    // Stream and parse CSV
    const parser = fs
      .createReadStream(absPath)
      .pipe(parse({ columns: true, skip_empty_lines: true, trim: true }));

    let total = 0;
    let updated = 0;
    let skipped = 0;

    for await (const row of parser) {
      total += 1;
      const rawUserId = row.user_id ?? row.userID ?? row.id;
      const email = row.email ?? row.Email;

      const learnerTypeModel = row.learner_type_model ?? row.learnerTypeModel ?? row.learner_type ?? null;
      const rekomendasi = row.rekomendasi ?? row.recommendation ?? null;
      const lastEnrolledAt = row.last_enrolled_at ?? row.lastEnrolledAt ?? null;
      const lastClass = row.last_class ?? row.lastClass ?? null;

      if (!rawUserId && !email) {
        skipped += 1;
        continue;
      }

      const userId = rawUserId ? Number(String(rawUserId).trim()) : null;

      const fields = [];
      const values = [];

      if (learnerTypeModel != null && String(learnerTypeModel).length > 0) {
        fields.push('learner_type_model');
        values.push(String(learnerTypeModel));
      }
      if (rekomendasi != null && String(rekomendasi).length > 0) {
        fields.push('rekomendasi');
        values.push(String(rekomendasi));
      }
      if (lastEnrolledAt != null && String(lastEnrolledAt).length > 0) {
        const d = new Date(String(lastEnrolledAt));
        if (!isNaN(d.getTime())) {
          fields.push('last_enrolled_at');
          values.push(d.toISOString());
        }
      }
      if (lastClass != null && String(lastClass).length > 0) {
        fields.push('last_class');
        values.push(String(lastClass));
      }

      if (fields.length === 0) {
        skipped += 1;
        continue;
      }

      const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(', ');

      let res;
      if (userId) {
        res = await pool.query(`UPDATE users SET ${setClause} WHERE user_id = $${fields.length + 1}`, [...values, userId]);
      } else if (email) {
        res = await pool.query(`UPDATE users SET ${setClause} WHERE email = $${fields.length + 1}`, [...values, String(email)]);
      }

      updated += res?.rowCount || 0;
    }

    console.log(`[info] Processed: ${total}, updated: ${updated}, skipped: ${skipped}`);
    await pool.end();
    console.log('[info] Done.');
  } catch (err) {
    console.error('[fatal]', err);
    try { await pool.end(); } catch {}
    process.exit(1);
  }
})();
