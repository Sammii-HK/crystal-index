import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'
import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(__dirname, '../.env.local') })

const prisma = new PrismaClient()

function generateApiKey(): string {
  const key = crypto.randomBytes(32).toString('hex')
  return `ci_${key}`
}

function hashApiKey(key: string): string {
  return crypto.createHash('sha256').update(key).digest('hex')
}

async function main() {
  // Find the user
  const users = await prisma.user.findMany({
    select: { id: true, email: true, plan: true },
    take: 10,
  })

  console.log('Users found:')
  users.forEach((u) => console.log(`  ${u.id} | ${u.email} | ${u.plan}`))

  if (users.length === 0) {
    console.log('No users found')
    return
  }

  // Use the first user (or the only user)
  const user = users[0]
  console.log(`\nGenerating API key for: ${user.email}`)

  const plaintext = generateApiKey()
  const keyHash = hashApiKey(plaintext)

  await prisma.apiKey.create({
    data: {
      userId: user.id,
      keyHash,
      name: 'iOS App Testing',
    },
  })

  console.log('\n✅ API key generated!')
  console.log(`\nKey: ${plaintext}`)
  console.log('\nCopy this key — it will NOT be shown again.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
