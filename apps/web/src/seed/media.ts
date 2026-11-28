import { existsSync } from 'node:fs'
import path from 'node:path'

import type { Media } from '@ceylonvvip/db'
import type { Payload } from 'payload'

import { blurDataURL } from '../lib/blur'

/*
 * Photos from the Figma file (task 159). The client has no photos of their own yet,
 * so the site uses the ones in the design. They live in ./images as WebP made straight
 * from the Figma originals (task 169, quality 90), named by subject. Three are stand-ins the client should replace (marked below): Figma labels
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
  const found = candidates.find((d) => existsSync(path.join(d, 'prado-150-front.webp')))
  if (!found) throw new Error(`Seed photos not found. Looked in: ${candidates.join(', ')}`)
  return found
}

export const PHOTOS = {
  // The client's own white Toyota Prado 150 and BMW 520d (photos from the client).
  prado: {
    file: 'prado-150-front',
    alt: 'A white Toyota Prado 150 on a road lined with tropical trees',
  },
  pradoSide: {
    file: 'prado-150-side',
    alt: 'A white Toyota Prado 150 seen from the side, parked by tropical trees',
  },
  pradoAirport: {
    file: 'prado-airport',
    alt: 'A white Toyota Prado 150 waiting at Bandaranaike International Airport',
  },
  pradoHotel: {
    file: 'prado-hotel',
    alt: 'A white Toyota Prado 150 at a hotel entrance in the evening',
  },
  bmw: { file: 'bmw-520d-front', alt: 'A white BMW 520d parked by tropical trees' },
  bmwSide: { file: 'bmw-520d-side', alt: 'A white BMW 520d seen from the side' },
  rearCabin: {
    file: 'bmw-rear-seats',
    alt: 'The beige leather rear seats of the BMW 520d, with the door open',
  },
  // Figma stand-ins for the Toyota Voxy, Audi A3 and Honda Vezel: replace them with
  // real photos of those cars.
  sedanDoorOpen: {
    file: 'sedan-door-open',
    alt: 'A black luxury sedan with its rear door open, ready for a guest',
  },
  mpvHotel: {
    file: 'mpv-hotel-entrance',
    alt: 'A black people carrier at a lantern-lit hotel entrance at dusk',
  },
  // Places, from Pixabay (Pixabay Content License, free for commercial use).
  sigiriya: {
    file: 'sigiriya-rock',
    alt: 'Sigiriya rock fortress above the gardens and the jungle',
    // Keep the summit in frame in tall crops.
    focalY: 18,
  },
  ella: {
    file: 'ella-nine-arches-train',
    alt: 'A blue train crossing the Nine Arches Bridge in the green hills of Ella',
    focalX: 58,
  },
  galle: {
    file: 'galle-lighthouse',
    alt: 'Galle Fort lighthouse and ramparts above the sea',
    focalX: 26,
  },
  nuwaraEliya: {
    file: 'nuwara-eliya-tea',
    alt: 'Tea estates on the green hills around Nuwara Eliya',
  },
  // Home page: places, not cars (the cars are on the fleet and service pages).
  homeHero: {
    file: 'south-coast-sunset',
    alt: 'Palm trees against a pink and violet sunset on the south coast',
  },
  journey: { file: 'golden-beach', alt: 'Waves on a long golden beach lined with palm trees' },
  // Service cards (Home and Services): each shows its service (the client's request);
  // each service page keeps its car photo. Free photos, no attribution required:
  // Unsplash and Pexels licences. Sources:
  // cardAirport: unsplash.com/photos/AxjVptC_MYQ (Horizon flights)
  // cardTours: unsplash.com/photos/ePAa2c9XbtE (Matt Dany)
  // cardWedding: unsplash.com/photos/lbmuW0e2x-g (Damian Chojnacki)
  // cardActivities: unsplash.com/photos/v2zEiziFb44 (Tom Paisley)
  // cardSecurity: pexels.com/photo/7594130 (Pavel Danilyuk)
  // cardCare: pexels.com/photo/5267336 (KEON VINES)
  // cardHotels: unsplash.com/photos/kvf5kfVMqng (Charanjeet Dhiman)
  cardAirport: {
    file: 'svc-airport',
    alt: 'A couple with their bags walking from a white car to a private plane',
    focalX: 45,
    focalY: 60,
  },
  cardTours: {
    file: 'svc-tours',
    alt: 'A traveller leaning out of the hill country train past tea gardens near Ella',
  },
  cardWedding: {
    file: 'svc-wedding',
    alt: 'A dark sedan dressed with a garland of white flowers for a wedding',
    focalX: 60,
  },
  cardActivities: {
    file: 'svc-activities',
    alt: 'An elephant beside a safari jeep with guests on a national park plain',
    focalX: 60,
  },
  cardSecurity: {
    file: 'svc-security',
    alt: 'A man in a dark coat opening the rear door of a black limousine',
    focalY: 40,
  },
  cardCare: {
    file: 'svc-care',
    alt: 'A companion steadying an elderly man with a walking stick on a city street',
  },
  cardHotels: {
    file: 'svc-ayurveda',
    alt: 'A guest receiving shirodhara, warm oil poured on the forehead from a brass vessel',
    focalX: 30,
    focalY: 40,
  },
  bentotaBeach: { file: 'bentota-beach', alt: 'Palm trees on a beach on the south-west coast' },
  bentotaRiver: {
    file: 'outrigger-boat',
    alt: 'A wooden outrigger boat on a sandy beach',
    focalX: 30,
  },
  hotelSuite: { file: 'hotel-pool', alt: 'A hotel pool among palm trees under a blue sky' },
  sapphires: { file: 'ceylon-sapphires', alt: 'Blue and pink Ceylon sapphires on white cloth' },
  // Placeholder in Figma: replace with a map of the office.
  map: { file: 'map-placeholder', alt: 'Map of Sri Lanka with routes from Aluthgama' },
  // Placeholder in Figma: replace with a photo of the real travel manager.
  travelManager: {
    file: 'travel-manager-placeholder',
    alt: 'Your travel manager, in a hotel lobby',
    // The face is near the top of this tall photo: keep it in frame in every crop.
    focalY: 14,
  },
} as const

/** Photos earlier seeds uploaded that no page uses any more; removed after seeding. */
const RETIRED_FILES = [
  'coast-road-bentota',
  'prado-tea-country',
  'bmw-520d-villa',
  'wedding-car',
  'chauffeur-door',
  'rear-cabin',
  'sigiriya-sunrise',
  'ella-nine-arches',
  'galle-fort',
  'hotel-sunset-suite',
  'bentota-river',
  // Scenic service cards tried before the relevant photos (never on staging).
  'card-airport',
  'card-island-train',
  'card-wedding-frangipani',
  'card-elephants',
  'card-hotel-atrium',
  'card-lotus',
  'card-ayurveda',
]

export type PhotoKey = keyof typeof PHOTOS
// Photo per vehicle (08 Fleet). The Voxy, Audi A3 and Honda Vezel still use the Figma
// stand-ins; replace them with real photos of the cars.
export const VEHICLE_PHOTOS: Record<string, PhotoKey> = {
  'bmw-520d': 'bmw',
  'toyota-prado-150': 'pradoSide',
  'toyota-voxy': 'mpvHotel',
  'audi-a3': 'sedanDoorOpen',
  'honda-vezel': 'sedanDoorOpen',
}

// The photo under each service page's hero.
export const SERVICE_HERO_PHOTOS: Record<string, PhotoKey> = {
  'airport-transfers': 'pradoAirport',
  'island-tours': 'sigiriya',
  'wedding-honeymoon': 'bmwSide',
  activities: 'bentotaRiver',
  'security-bodyguards': 'pradoHotel',
  'elder-care': 'rearCabin',
  'hotels-ayurveda': 'hotelSuite',
}

// The photo on each service's card in the services grid (Home and Services).
export const SERVICE_CARD_PHOTOS: Record<string, PhotoKey> = {
  'airport-transfers': 'cardAirport',
  'island-tours': 'cardTours',
  'wedding-honeymoon': 'cardWedding',
  activities: 'cardActivities',
  'security-bodyguards': 'cardSecurity',
  'elder-care': 'cardCare',
  'hotels-ayurveda': 'cardHotels',
}

export type Photos = Record<PhotoKey, Media>

// An unreachable storage endpoint can stall an upload for minutes; give up sooner.
const UPLOAD_TIMEOUT_MS = 20_000

function withTimeout<T>(work: Promise<T>, ms: number, message: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(message)), ms)
  })
  return Promise.race([work, timeout]).finally(() => clearTimeout(timer))
}

/** Photos that could not be uploaded in the last seed (storage unreachable, etc.). */
export const photoErrors: string[] = []

/** Photos from earlier seeds (old JPEGs, retired photos), removed once pages are reseeded. */
export const oldJpegs: Array<number | string> = []

/** Uploads every photo once; a photo already in Media (same file name) is reused. */
export async function seedMedia(payload: Payload): Promise<Photos> {
  const out = {} as Photos
  const dir = imagesDir()
  for (const [key, photo] of Object.entries(PHOTOS) as Array<
    [PhotoKey, (typeof PHOTOS)[PhotoKey]]
  >) {
    const { file, alt } = photo
    const focalY = 'focalY' in photo ? photo.focalY : undefined
    const focalX = 'focalX' in photo ? photo.focalX : undefined
    const focal =
      focalY != null || focalX != null ? { focalX: focalX ?? 50, focalY: focalY ?? 50 } : null
    const filename = `${file}.webp`
    const { docs } = await payload.find({
      collection: 'media',
      where: { filename: { equals: filename } },
      limit: 1,
      depth: 0,
    })
    if (docs[0] && focal && (docs[0].focalX !== focal.focalX || docs[0].focalY !== focal.focalY)) {
      docs[0] = await payload.update({
        collection: 'media',
        id: docs[0].id,
        data: focal,
        context: { disableRevalidate: true },
      })
    }
    // Photos seeded before blurred previews existed (task 166) get one now.
    if (docs[0] && !docs[0].blurDataURL) {
      docs[0] = await payload.update({
        collection: 'media',
        id: docs[0].id,
        data: { blurDataURL: await blurDataURL(path.join(dir, filename)) },
        context: { disableRevalidate: true },
      })
    }
    try {
      out[key] =
        docs[0] ??
        (await withTimeout(
          payload.create({
            collection: 'media',
            data: { alt, ...focal },
            filePath: path.join(dir, filename),
            context: { disableRevalidate: true },
          }),
          UPLOAD_TIMEOUT_MS,
          `upload timed out after ${UPLOAD_TIMEOUT_MS / 1000}s (storage unreachable?)`,
        ))
    } catch (error) {
      // Keep seeding without this photo: pages and translations still load, and the
      // photo fills in on the next seed once storage works.
      const message = error instanceof Error ? error.message : String(error)
      photoErrors.push(`${filename}: ${message}`)
      payload.logger.error({ err: error }, `Seed: could not upload ${filename}`)
      out[key] = { id: null } as unknown as Media
      continue
    }
    // Task 169: the WebP replaces the JPEG an earlier seed uploaded. The pages are seeded
    // again with the new photo, so the old one is no longer used anywhere.
    const old = await payload.find({
      collection: 'media',
      where: { filename: { equals: `${file}.jpg` } },
      limit: 1,
      depth: 0,
    })
    for (const doc of old.docs) {
      oldJpegs.push(doc.id)
    }
  }
  // Photos replaced by the client's car photos and the Pixabay places (task 169).
  const retired = await payload.find({
    collection: 'media',
    where: { filename: { in: RETIRED_FILES.flatMap((f) => [`${f}.webp`, `${f}.jpg`]) } },
    limit: 100,
    depth: 0,
  })
  for (const doc of retired.docs) oldJpegs.push(doc.id)
  return out
}
