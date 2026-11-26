import * as migration_20261126_104023_initial from './20261126_104023_initial'

export const migrations = [
  {
    up: migration_20261126_104023_initial.up,
    down: migration_20261126_104023_initial.down,
    name: '20261126_104023_initial',
  },
]
