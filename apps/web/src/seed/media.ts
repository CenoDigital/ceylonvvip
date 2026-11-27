import { existsSync } from 'node:fs'
import path from 'node:path'

import type { Media } from '@ceylonvvip/db'
import type { Payload } from 'payload'

/*
 * Photos from the Figma file (task 159). The client has no photos of their own yet,
 * so the site uses the ones in the design. Optimised JPEGs live in ./images, named by
 * subject. Three are stand-ins the client should replace (marked below): Figma labels
 * the portrait and the map "AI placeholder", and the Audi A3 and Honda Vezel share a
 * sedan photo that is neither car.
 */

/**
 * Where the photos are: src/seed/images when the seed runs from the repo (pnpm seed,
 * CI), apps/web/seed-images inside the Docker image (staging seeds on start).
 */
function imagesDir(): string {
  const candidates = [
    process.env.SEED_IMAGES_DIR,
    path.resolve(process.cwd(), 'src/seed/images'),
    path.resolve(process.cwd(), 'apps/web/seed-images'),
    path.resolve(process.cwd(), 'seed-images'),
  ].filter((d): d is string => Boolean(d))
  const found = candidates.find((d) => existsSync(path.join(d, 'coast-road-bentota.jpg')))
  if (!found) throw new Error(`Seed photos not found. Looked in: ${candidates.join(', ')}`)
  return found
}

export const PHOTOS = {
  coastRoad: {
    file: 'coast-road-bentota',
    alt: 'A black sedan on the coast road at Bentota at dusk',
  },
  sedanDoorOpen: {
    file: 'sedan-door-open',
    alt: 'A black luxury sedan with its rear door open, ready for a guest',
  },
  ella: { file: 'ella-nine-arches', alt: 'The Nine Arches Bridge in the misty hills of Ella' },
  sigiriya: { file: 'sigiriya-sunrise', alt: 'Sigiriya rock fortress at sunrise above the jungle' },
  mpvHotel: {
    file: 'mpv-hotel-entrance',
    alt: 'A black people carrier at a lantern-lit hotel entrance at dusk',
  },
  sapphires: { file: 'ceylon-sapphires', alt: 'Blue and pink Ceylon sapphires on white cloth' },
  galle: { file: 'galle-fort', alt: 'Galle Fort lighthouse and ramparts above a turquoise sea' },
  weddingCar: {
    file: 'wedding-car',
    alt: 'A black sedan dressed with white orchids and ribbon for a wedding',
  },
  pradoTea: {
    file: 'prado-tea-country',
    alt: 'A black Toyota Prado on a road through tea country',
  },
  chauffeur: {
    file: 'chauffeur-door',
    alt: 'A chauffeur in a suit opening the rear door of a car with beige leather seats',
  },
  rearCabin: {
    file: 'rear-cabin',
    alt: 'Beige leather rear seats with a folded towel and a glass bottle of water',
  },
  // Placeholder in Figma: replace with a map of the office.
  map: { file: 'map-placeholder', alt: 'Map of Sri Lanka with routes from Aluthgama' },
  bmw: { file: 'bmw-520d-villa', alt: 'A black BMW 520d in a villa driveway by the sea' },
  hotelSuite: {
    file: 'hotel-sunset-suite',
    alt: 'A hotel suite opening onto a beach terrace at sunset',
  },
  bentotaRiver: { file: 'bentota-river', alt: 'A wooden boat on the Bentota river at sunset' },
  // Placeholder in Figma: replace with a photo of the real travel manager.
  travelManager: {
    file: 'travel-manager-placeholder',
    alt: 'Your travel manager, in a hotel lobby',
  },
} as const

export type PhotoKey = keyof typeof PHOTOS
// Figma photo per vehicle (08 Fleet). The Audi A3 and Honda Vezel share a stand-in
// sedan photo in Figma; replace both with real photos of the cars.
export const VEHICLE_PHOTOS: Record<string, PhotoKey> = {
  'bmw-520d': 'bmw',
  'toyota-prado-150': 'pradoTea',
  'toyota-voxy': 'mpvHotel',
  'audi-a3': 'sedanDoorOpen',
  'honda-vezel': 'sedanDoorOpen',
}

// Figma: the photo under each service page's hero.
export const SERVICE_HERO_PHOTOS: Record<string, PhotoKey> = {
  'airport-transfers': 'sedanDoorOpen',
  'island-tours': 'sigiriya',
  'wedding-honeymoon': 'weddingCar',
  activities: 'bentotaRiver',
  'security-bodyguards': 'mpvHotel',
  'elder-care': 'chauffeur',
}

export type Photos = Record<PhotoKey, Media>

/** Uploads every photo once; a photo already in Media (same file name) is reused. */
export async function seedMedia(payload: Payload): Promise<Photos> {
  const out = {} as Photos
  const dir = imagesDir()
  for (const [key, { file, alt }] of Object.entries(PHOTOS) as Array<
    [PhotoKey, (typeof PHOTOS)[PhotoKey]]
  >) {
    const filename = `${file}.jpg`
    const { docs } = await payload.find({
      collection: 'media',
      where: { filename: { equals: filename } },
      limit: 1,
      depth: 0,
    })
    out[key] =
      docs[0] ??
      (await payload.create({
        collection: 'media',
        data: { alt },
        filePath: path.join(dir, filename),
        context: { disableRevalidate: true },
      }))
  }
  return out
}
