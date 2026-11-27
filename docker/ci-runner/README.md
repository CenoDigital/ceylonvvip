# Local CI runner

CI runs on GitHub Actions. When the organisation's GitHub-hosted minutes run out, the same
workflows can run on this machine instead, through two self-hosted runners in Docker.

## Switch CI to this machine

1. Start Docker Desktop.
2. In PowerShell, from this folder:

   ```powershell
   ./start.ps1
   ```

3. Point the workflows at the runners (a repository variable, no code change):

   ```powershell
   gh variable set CI_RUNNER --body ceylon-local
   ```

The runners restart with Docker Desktop. Jobs wait in the queue while this machine or
Docker is off.

## Switch back to GitHub's runners

```powershell
gh variable delete CI_RUNNER
```

## Stop or remove the runners

```powershell
docker compose stop          # pause
docker compose down -v       # remove, then delete them under Settings, Actions, Runners
```

Each runner has its own Docker engine (in the `docker-1` and `docker-2` volumes), so
workflow containers never touch the containers you run yourself.
