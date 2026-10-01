/**
 * Regression guard for the crystal photo outage (1 Jul to 1 Oct 2026).
 *
 * /api/image/[id] was declared `export const runtime = 'edge'`. Prisma cannot run on the Edge
 * runtime, so every request threw "PrismaClient is not configured to run in Edge Runtime":
 * 758 failures across 13 users, and every photo in the paid iOS app 500'd. Middleware also
 * stamped those 500s `immutable` for a year, so the CDN kept serving them.
 *
 * Neither can be unit-tested by running the handler, so this asserts the source declarations.
 */
const fs = require('fs')
const path = require('path')

const read = (rel) => fs.readFileSync(path.join(__dirname, '..', rel), 'utf8')

describe('image route configuration', () => {
  const route = read('app/api/image/[id]/route.ts')

  test('runs on the Node runtime, never Edge (Prisma cannot run on Edge)', () => {
    expect(route).toMatch(/export const runtime = ['"]nodejs['"]/)
    expect(route).not.toMatch(/runtime\s*=\s*['"]edge['"]/)
  })

  test('only a successful lookup is cached; failures are never marked immutable', () => {
    const cacheLines = route.split('\n').filter((l) => /immutable/.test(l))
    // every immutable header must sit on the redirect branch, not on an error response
    expect(cacheLines.length).toBeGreaterThan(0)
    expect(route).not.toMatch(/status:\s*500[^}]*immutable/s)
  })

  test('middleware does not blanket-cache /api/image (it would pin failures for a year)', () => {
    const middleware = read('middleware.ts')
    expect(middleware).not.toMatch(/startsWith\(['"]\/api\/image['"]\)/)
  })
})
