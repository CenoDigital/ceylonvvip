#!/usr/bin/env bash
# Starts the inner Docker engine, registers the runner on first start (the registration
# is kept in /state, so restarts reuse it), then waits for jobs.
set -euo pipefail

dockerd > /var/log/dockerd.log 2>&1 &
for _ in $(seq 1 30); do docker info > /dev/null 2>&1 && break; sleep 1; done
docker info > /dev/null || { cat /var/log/dockerd.log; exit 1; }

cd /home/runner
FILES=(.runner .credentials .credentials_rsaparams)
if [ -f /state/.runner ]; then
  for f in "${FILES[@]}"; do cp "/state/$f" .; done
else
  : "${RUNNER_TOKEN:?Set RUNNER_TOKEN for the first start (see README.md)}"
  ./config.sh --unattended --replace \
    --url "https://github.com/${RUNNER_REPO:?}" \
    --token "$RUNNER_TOKEN" \
    --name "${RUNNER_NAME:?}" \
    --labels "${RUNNER_LABELS:-ceylon-local}" \
    --work _work
  for f in "${FILES[@]}"; do cp "$f" /state/; done
fi
unset RUNNER_TOKEN

exec ./run.sh
