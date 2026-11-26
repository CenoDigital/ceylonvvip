import * as migration_20261126_104023_initial from './20261126_104023_initial'
import * as migration_20261126_190954_users_roles from './20261126_190954_users_roles'

export const migrations = [
  {
    up: migration_20261126_104023_initial.up,
    down: migration_20261126_104023_initial.down,
    name: '20261126_104023_initial',
  },
  {
    up: migration_20261126_190954_users_roles.up,
    down: migration_20261126_190954_users_roles.down,
    name: '20261126_190954_users_roles',
  },
]
