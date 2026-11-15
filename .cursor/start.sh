#!/usr/bin/env bash
# Start PostgreSQL for this machine.
# The database files stay on disk. The server process does not survive a new boot,
# and a leftover pid file from the previous boot would block the next start.
set -euo pipefail

if ! command -v pg_lsclusters >/dev/null 2>&1; then
  echo "PostgreSQL is not installed. The setup script installs it." >&2
  exit 1
fi

if pg_isready -q; then
  exit 0
fi

read -r version cluster _ < <(pg_lsclusters --no-header | awk 'NR==1 {print $1, $2}')
sudo rm -f "/var/run/postgresql/${version}-${cluster}.pid"
sudo rm -f "/var/lib/postgresql/${version}/${cluster}/postmaster.pid"
sudo pg_ctlcluster "$version" "$cluster" start

for _ in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20; do
  if pg_isready -q; then
    exit 0
  fi
  sleep 1
done

echo "PostgreSQL did not become ready." >&2
exit 1
