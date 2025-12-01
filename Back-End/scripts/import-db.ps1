param(
  [string]$Host = $(if ($env:PGHOST) { $env:PGHOST } else { 'localhost' }),
  [int]$Port = $(if ($env:PGPORT) { [int]$env:PGPORT } else { 5432 }),
  [string]$User = $(if ($env:PGUSER) { $env:PGUSER } else { 'postgres' }),
  [string]$Password = $(if ($env:PGPASSWORD) { $env:PGPASSWORD } else { '' }),
  [string]$Database = $(if ($env:PGDATABASE) { $env:PGDATABASE } else { 'ai_learning_insight' }),
  [string]$SqlPath = "$PSScriptRoot\..\src\db\ai_learning_db.sql"
)

if (!(Test-Path $SqlPath)) {
  Write-Error "SQL file not found at: $SqlPath"
  exit 1
}

if (-not $Password -or $Password -eq '') {
  Write-Host "PGPASSWORD not provided; attempting without password..."
}

$original = $env:PGPASSWORD
if ($Password) { $env:PGPASSWORD = $Password }

try {
  Write-Host "Importing $SqlPath into $Database on $Host:$Port as $User ..."
  & psql -U $User -h $Host -p $Port -d $Database -f $SqlPath
  if ($LASTEXITCODE -ne 0) { throw "psql exited with code $LASTEXITCODE" }
  Write-Host "Import completed successfully."
}
catch {
  Write-Error $_
  exit 1
}
finally {
  if ($Password) { $env:PGPASSWORD = $original }
}
