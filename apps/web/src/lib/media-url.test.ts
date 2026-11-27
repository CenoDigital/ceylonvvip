import { describe, expect, it } from 'vitest'

import { mediaSrc } from './media-url'

describe('mediaSrc', () => {
  it('turns same-site media URLs into paths for next/image', () => {
    expect(mediaSrc('https://staging.ceylonvvip.com/api/media/file/a.jpg')).toBe(
      '/api/media/file/a.jpg',
    )
    expect(mediaSrc('http://127.0.0.1:3000/api/media/file/a.jpg?2')).toBe('/api/media/file/a.jpg?2')
  })

  it('leaves paths and other URLs alone', () => {
    expect(mediaSrc('/api/media/file/a.jpg')).toBe('/api/media/file/a.jpg')
    expect(mediaSrc('https://cdn.example.com/a.jpg')).toBe('https://cdn.example.com/a.jpg')
    expect(mediaSrc(null)).toBeUndefined()
  })
})
