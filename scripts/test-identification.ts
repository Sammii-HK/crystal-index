#!/usr/bin/env tsx
/**
 * Test script for crystal identification
 * Usage: tsx scripts/test-identification.ts <image-url>
 * 
 * Example:
 *   tsx scripts/test-identification.ts https://www.crystalindex.co.uk/_next/image?url=%2Fapi%2Fimage%2F83&w=1080&q=100
 */

// Load environment variables from .env.local
import { readFileSync } from 'fs'
import { resolve } from 'path'

try {
  const envFile = readFileSync(resolve(process.cwd(), '.env.local'), 'utf-8')
  envFile.split('\n').forEach(line => {
    // Skip comments and empty lines
    if (line.trim().startsWith('#') || !line.trim()) return
    
    const match = line.match(/^([^=:#]+)=(.*)$/)
    if (match) {
      const key = match[1].trim()
      let value = match[2].trim()
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      // Set env var if not already set
      if (!process.env[key]) {
        process.env[key] = value
      }
    }
  })
  console.log('✅ Loaded environment variables from .env.local')
  console.log(`🔑 REPLICATE_API_TOKEN: ${process.env.REPLICATE_API_TOKEN ? '***' + process.env.REPLICATE_API_TOKEN.slice(-4) : 'NOT SET'}`)
} catch (error) {
  console.warn('⚠️  Could not load .env.local:', error instanceof Error ? error.message : 'Unknown error')
}

// Ensure DATABASE_URL is set (for Vercel Storage mapping)
import '../lib/env'

import { identifyCrystal } from '../lib/replicate'

async function testIdentification(imageUrl: string) {
  console.log('🔍 Testing crystal identification...')
  console.log(`📸 Image URL: ${imageUrl}`)
  console.log('')

  try {
    const startTime = Date.now()
    const result = await identifyCrystal(imageUrl)
    const duration = Date.now() - startTime

    console.log('✅ Identification complete!')
    console.log(`⏱️  Duration: ${duration}ms`)
    console.log('')
    console.log('📊 Results:')
    console.log('─'.repeat(50))
    
    result.topMatches.forEach((match, index) => {
      const confidencePercent = (match.confidence * 100).toFixed(1)
      const bar = '█'.repeat(Math.floor(match.confidence * 20))
      console.log(`${index + 1}. ${match.crystal.padEnd(25)} ${confidencePercent.padStart(6)}% ${bar}`)
    })
    
    console.log('─'.repeat(50))
    console.log(`🎯 Top Match: ${result.topMatches[0]?.crystal}`)
    console.log(`💯 Confidence: ${(result.confidence * 100).toFixed(1)}%`)
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

// Get image URL from command line args or use default
const imageUrl = process.argv[2] || 'https://www.crystalindex.co.uk/_next/image?url=%2Fapi%2Fimage%2F83&w=1080&q=100'

// Check if REPLICATE_API_TOKEN is set
if (!process.env.REPLICATE_API_TOKEN) {
  console.error('❌ Error: REPLICATE_API_TOKEN environment variable is not set')
  console.error('   Please set it in your .env.local file')
  process.exit(1)
}

testIdentification(imageUrl)
  .then(() => {
    console.log('')
    console.log('✨ Test complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Test failed:', error)
    process.exit(1)
  })

