import * as migration_20261126_104023_initial from './20261126_104023_initial'
import * as migration_20261126_190954_users_roles from './20261126_190954_users_roles'
import * as migration_20261126_193044_media_and_globals from './20261126_193044_media_and_globals'
import * as migration_20261126_193302_content_collections from './20261126_193302_content_collections'
import * as migration_20261126_195225_page_blocks from './20261126_195225_page_blocks'
import * as migration_20261126_213209_site_chrome_and_destinations from './20261126_213209_site_chrome_and_destinations'
import * as migration_20261126_215840_remaining_pages from './20261126_215840_remaining_pages'
import * as migration_20261126_222445_booking_forms from './20261126_222445_booking_forms'
import * as migration_20261126_222453_drop_old_booking_fields from './20261126_222453_drop_old_booking_fields'
import * as migration_20261127_064853_services_grid_cards from './20261127_064853_services_grid_cards'
import * as migration_20261127_072320_hero_caption_steps_image from './20261127_072320_hero_caption_steps_image'

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
  {
    up: migration_20261126_195225_page_blocks.up,
    down: migration_20261126_195225_page_blocks.down,
    name: '20261126_195225_page_blocks',
  },
  {
    up: migration_20261126_213209_site_chrome_and_destinations.up,
    down: migration_20261126_213209_site_chrome_and_destinations.down,
    name: '20261126_213209_site_chrome_and_destinations',
  },
  {
    up: migration_20261126_215840_remaining_pages.up,
    down: migration_20261126_215840_remaining_pages.down,
    name: '20261126_215840_remaining_pages',
  },
  {
    up: migration_20261126_222445_booking_forms.up,
    down: migration_20261126_222445_booking_forms.down,
    name: '20261126_222445_booking_forms',
  },
  {
    up: migration_20261126_222453_drop_old_booking_fields.up,
    down: migration_20261126_222453_drop_old_booking_fields.down,
    name: '20261126_222453_drop_old_booking_fields',
  },
  {
    up: migration_20261127_064853_services_grid_cards.up,
    down: migration_20261127_064853_services_grid_cards.down,
    name: '20261127_064853_services_grid_cards',
  },
  {
    up: migration_20261127_072320_hero_caption_steps_image.up,
    down: migration_20261127_072320_hero_caption_steps_image.down,
    name: '20261127_072320_hero_caption_steps_image',
  },
]
