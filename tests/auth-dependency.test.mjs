import test from 'node:test'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import path from 'node:path'
const require = createRequire(import.meta.url)
const root = path.dirname(require.resolve('next-auth'))
const signin = require(path.join(root, 'core/routes/signin.js')).default
const { encode, decode } = require('next-auth/jwt')

test('patched email normalisation rejects a homoglyph second separator before fixture IO', async () => {
  const calls = []
  const options = {
    url: new URL('https://fixture.invalid/api/auth'),
    provider: { type: 'email', id: 'email' },
    adapter: { getUserByEmail: async email => { calls.push(email); return { id: 'fixture-user', email } } },
    callbacks: { signIn: async () => false },
    logger: { error() {} },
  }
  const invalid = await signin({ options, body: { email: 'reader@example.test\uFF20other.test' }, query: {} })
  assert.match(invalid.redirect, /EmailSignin/)
  assert.deepEqual(calls, [])
  // Explicit refusal prevents mail or verification-token creation even for this valid fixture.
  const valid = await signin({ options, body: { email: '  Reader@Example.test  ' }, query: {} })
  assert.deepEqual(calls, ['reader@example.test'])
  assert.match(valid.redirect, /AccessDenied/)
})

test('patched auth crypto round-trips only in-memory fixture claims', async () => {
  const secret = 'local-fixture-only-not-a-real-account-secret'
  const token = await encode({ token: { sub: 'fixture-user' }, secret })
  assert.equal((await decode({ token, secret }))?.sub, 'fixture-user')
  await assert.rejects(decode({ token, secret: 'different-local-fixture-only-secret' }))
})

import * as sass from 'sass'
test('Next resolves patched PostCSS8 and processes the actual compiled site stylesheet', async () => {
  const nextRequire = createRequire(require.resolve('next/package.json'))
  const postcss = nextRequire('postcss')
  const [major, minor, patch] = nextRequire('postcss/package.json').version.split('.').map(Number)
  assert.ok(major === 8 && (minor > 5 || minor === 5 && patch >= 23))
  const css = sass.renderSync({
    file: 'styles/globals.scss',
    includePaths: ['node_modules'],
    importer: url => url === '~bulma' ? { file: path.resolve('node_modules/bulma/bulma.sass') } : url.startsWith('~') ? { file: path.resolve('node_modules', url.slice(1)) } : null,
    logger: { warn() {}, debug() {} },
  }).css.toString()
  await assert.doesNotReject(postcss([]).process(css, { from: 'styles/globals.scss', map: false }))
})
