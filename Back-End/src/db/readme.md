## Setup Database (PostgreSQL) untuk ai_learning_db

Panduan ini membuat database PostgreSQL lokal dari dump `ai_learning_db.sql` pada Windows (PowerShell).

- Engine: PostgreSQL (pakai driver `pg` di Back-End)
- File dump: `Back-End/src/db/ai_learning_db.sql`
- Default DB name (sesuai .env): `ai_learning_insight`

### 1) Prasyarat

- Install PostgreSQL 13+ (pastikan `psql` ada di PATH)
- Ketahui password user admin Anda (mis. `postgres`)

### 2) Buat role `user1` dan database `ai_learning_insight`

SQL dump ini mengatur OWNER ke `user1`. Agar perintah `ALTER TABLE ... OWNER TO user1` berhasil, buat dulu role-nya lalu buat database dengan owner tersebut.

Jalankan di PowerShell (pwsh):

```
# 2.a Buat role/login `user1` (ganti <PASSWORD_AMAN> sesuai kebutuhan)
psql -U postgres -h localhost -p 5432 -c "CREATE ROLE user1 LOGIN PASSWORD '<PASSWORD_AMAN>'";

# 2.b Buat database `ai_learning_insight` dan jadikan `user1` sebagai owner
psql -U postgres -h localhost -p 5432 -c "CREATE DATABASE ai_learning_insight OWNER user1";
```

Jika role sudah ada, abaikan error "already exists".

### 3) Import data dari `ai_learning_db.sql`

Karena path mengandung spasi, pastikan path file di-quote.

```
# Gunakan kredensial Anda (mis. user `postgres` / password Anda)
$env:PGPASSWORD = '011234'
psql -U postgres -h localhost -p 5432 -d ai_learning_insight -f "d:\College\5th Semester\Asah\AILearningInsight_CapstoneProject\Back-End\src\db\ai_learning_db.sql"

# Hapus env var (opsional)
Remove-Item Env:PGPASSWORD
```

Selesai. Tabel seperti `users`, `developer_journey_completion`, `developer_journeys`, `user_insight_summary`, dan `temp_users_update` akan terbuat beserta datanya.

### 4) Konfigurasi koneksi aplikasi (Back-End)

Kode koneksi (`src/services/Pool.js`) membaca env: `PGHOST`, `PGDATABASE`, `PGUSER`, `PGPASSWORD`.

Tambahkan ke file `.env` di folder `Back-End` (atau sesuaikan yang sudah ada):

```
PGHOST=localhost
PGPORT=5432
PGUSER=postgres
PGPASSWORD=011234
PGDATABASE=ai_learning_insight
```

Catatan: Jika Anda ingin tetap memakai variabel `DB_*`, ubah `src/services/Pool.js` agar membaca `DB_HOST/DB_NAME/DB_USER/DB_PASSWORD`.

### 5) Verifikasi cepat

```
psql -U user1 -h localhost -p 5432 -d ai_learning -c "\dt"
```

Anda seharusnya melihat daftar tabel dari dump.
