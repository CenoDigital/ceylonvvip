# Builds and starts the local CI runners. Needs Docker Desktop running and the GitHub CLI
# signed in with admin access to the repo. The registration token lives only in this
# process; after the first start the runners reuse their saved registration.
Set-Location $PSScriptRoot

$env:RUNNER_TOKEN = gh api -X POST repos/CenoDigital/ceylonvvip/actions/runners/registration-token -q .token
if (-not $env:RUNNER_TOKEN) { throw 'Could not get a registration token from GitHub.' }
try {
  # Docker writes progress to stderr; check the exit code instead.
  cmd /c 'docker compose up -d --build 2>&1'
  if ($LASTEXITCODE -ne 0) { throw 'docker compose up failed.' }
} finally {
  Remove-Item Env:RUNNER_TOKEN
}
docker compose ps
