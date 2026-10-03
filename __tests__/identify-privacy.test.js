/**
 * Privacy + cost guards for POST /api/v1/identify.
 *
 * The iOS app sends a photo of the user's crystal. App requests are anonymous and are not saved
 * to any record, and the privacy policy (lunarcomputing.org/apps/crystal-index/privacy) says the
 * photo is only used to identify the crystal, so it must be deleted once analysed. The app secret
 * ships inside the binary, so a global daily cap backs up the per-IP limit.
 *
 * The handler needs Blob, Prisma and DeepInfra, so this asserts the source declarations.
 */
const fs = require('fs')
const path = require('path')

const route = fs.readFileSync(path.join(__dirname, '..', 'app/api/v1/identify/route.ts'), 'utf8')

describe('identify route privacy and cost guards', () => {
  test('anonymous app uploads are tracked and deleted on success and on failure', () => {
    expect(route).toMatch(/if \(isAppRequest\) anonymousUploads\.push\(imageUrl\)/)
    expect(route).toMatch(/deleteImageFromBlob/)
    // once before the success response, once in the catch block
    expect(route.match(/await discardAnonymousUploads\(\)/g)).toHaveLength(2)
  })

  test('app callers are not handed back a public photo URL', () => {
    expect(route).toMatch(/imageUrl: isAppRequest \? null : imageUrl/)
    expect(route).toMatch(/processedImageUrl: isAppRequest \? null : processedImageUrl/)
  })

  test('a global daily cap protects against an extracted app secret', () => {
    expect(route).toMatch(/checkRateLimit\('app-global'/)
    expect(route).toMatch(/status: 503/)
  })
})
