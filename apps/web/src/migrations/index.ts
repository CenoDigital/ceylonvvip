import * as migration_20261126_104023_initial from './20261126_104023_initial'
import * as migration_20261126_190954_users_roles from './20261126_190954_users_roles'
import * as migration_20261126_193044_media_and_globals from './20261126_193044_media_and_globals'
import * as migration_20261126_193302_content_collections from './20261126_193302_content_collections'

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
  {
    up: migration_20261126_193044_media_and_globals.up,
    down: migration_20261126_193044_media_and_globals.down,
    name: '20261126_193044_media_and_globals',
  },
  {
    up: migration_20261126_193302_content_collections.up,
    down: migration_20261126_193302_content_collections.down,
    name: '20261126_193302_content_collections',
  },
]
