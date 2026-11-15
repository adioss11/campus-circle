#!/usr/bin/env bash
# Runs once when a Cloud Agent environment is built.
# Creates the folders that git does not store: frontend/node_modules and backend/.venv.
set -euo pipefail

cd frontend
npm ci

cd ../backend
if ! python3 -c 'import ensurepip' >/dev/null 2>&1; then
  sudo DEBIAN_FRONTEND=noninteractive apt-get update
  sudo DEBIAN_FRONTEND=noninteractive apt-get install -y python3-venv
fi
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
