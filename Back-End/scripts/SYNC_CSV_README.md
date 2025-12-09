# Sync CSV to Database

Script untuk sinkronisasi data dari CSV `data rulebased setelah rekomendasi.csv` ke database PostgreSQL tabel `users`.

## Kolom yang Disinkronisasi

- `total_point` → `total_point`
- `mean_point` → `mean_point`
- `n_kelas` → `total_kelas`
- `fast` → `n_kelas_fast`
- `normal` → `normal`
- `slow` → `slow`
- `n_avg_submission` → `n_avg_submission`
- `learner_type_model` → `learner_type`
- `last_class` → `last_class` (kolom baru akan ditambah jika belum ada)
- `rekomendasi` → `rekomendasi` (kolom baru akan ditambah jika belum ada)

## Cara Menggunakan

### Prerequisite

1. Pastikan file CSV sudah ada di: `Back-End/src/db/data rulebased setelah rekomendasi.csv`
2. Database PostgreSQL sudah berjalan dan terhubung dengan baik
3. Pastikan `.env` di folder `Back-End` sudah lengkap dengan:
   ```
   PGHOST=localhost
   PGPORT=5432
   PGUSER=postgres
   PGPASSWORD=<your_password>
   PGDATABASE=ai_learning_insight
   ```

### Menjalankan Script

Dari folder `Back-End`:

```bash
npm run db:sync-csv
```

Atau langsung dengan Node:

```bash
node ./scripts/sync-csv-to-db.js
```

### Output

Script akan menampilkan progress dan hasil akhir:

```
🔍 Checking environment variables...
   PGHOST: localhost
   PGUSER: postgres
   PGDATABASE: ai_learning_insight
   PGPASSWORD: ***
   PGPORT: 5432

✅ Environment variables OK

✅ Connected to database

📋 Checking database schema...
✅ Schema check complete

📖 Reading CSV file...

✅ Sync completed!
📊 Total rows: 831
✅ Updated: X users
⚠️  Errors: 0 users

✅ All done!
```

**Catatan:** Hanya user yang sudah terdaftar di database yang akan terupdate. Jika hanya beberapa user yang updated, pastikan data user sudah diimport terlebih dahulu dengan `npm run db:import`.

## Catatan

- Script menggunakan `COALESCE` untuk hanya update kolom yang memiliki nilai di CSV, tidak menimpa data yang sudah ada jika CSV berisi `null`
- Jika ada error pada user tertentu, script akan log error namun tetap melanjutkan user berikutnya
- Kolom `rekomendasi` dan `last_class` akan ditambahkan otomatis jika belum ada di database

## Troubleshooting

### Error: "CSV file not found"

Pastikan lokasi file CSV benar di: `Back-End/src/db/data rulebased setelah rekomendasi.csv`

### Error: "connect ECONNREFUSED"

Pastikan PostgreSQL sudah berjalan dan environment variables `.env` benar

### Error: "column does not exist"

Pastikan tabel `users` sudah ada di database. Jika perlu, jalankan `npm run db:import` terlebih dahulu
