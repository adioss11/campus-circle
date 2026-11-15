#!/usr/bin/env bash
# Runs once when a Cloud Agent environment is built.
# Creates what git does not store: frontend/node_modules, backend/.venv, backend/.env,
# and the local PostgreSQL user and database.
set -euo pipefail

cd "$(dirname "$0")/.."
root=$(pwd)

cd "$root/frontend"
npm ci

cd "$root/backend"
if ! python3 -c 'import ensurepip' >/dev/null 2>&1; then
  sudo DEBIAN_FRONTEND=noninteractive apt-get update
  sudo DEBIAN_FRONTEND=noninteractive apt-get install -y python3-venv
fi
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt

if [ ! -f .env ]; then
  cp .env.example .env
fi

if ! command -v pg_isready >/dev/null 2>&1; then
  sudo DEBIAN_FRONTEND=noninteractive apt-get update
  sudo DEBIAN_FRONTEND=noninteractive apt-get install -y postgresql
fi

bash "$root/.cursor/start.sh"

# Password matches backend/.env.example. This is the local development login.
sudo -u postgres psql -v ON_ERROR_STOP=1 <<'SQL'
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'campuscircle') THEN
    CREATE ROLE campuscircle LOGIN PASSWORD 'campuscircle';
  END IF;
END
$$;
SQL

if ! sudo -u postgres psql -tAc "SELECT 1 FROM pg_database WHERE datname = 'campuscircle'" | grep -q 1; then
  sudo -u postgres psql -v ON_ERROR_STOP=1 -c "CREATE DATABASE campuscircle OWNER campuscircle;"
fi
