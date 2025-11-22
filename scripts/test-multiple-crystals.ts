#!/usr/bin/env tsx
/**
 * Test script for multiple crystal identifications
 * Usage: tsx scripts/test-multiple-crystals.ts
 */

// Load environment variables from .env.local
import { readFileSync } from 'fs'
import { resolve } from 'path'

try {
  const envFile = readFileSync(resolve(process.cwd(), '.env.local'), 'utf-8')
  envFile.split('\n').forEach(line => {
    if (line.trim().startsWith('#') || !line.trim()) return
    const match = line.match(/^([^=:#]+)=(.*)$/)
    if (match) {
      const key = match[1].trim()
      let value = match[2].trim()
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      if (!process.env[key]) {
        process.env[key] = value
      }
    }
  })
} catch (error) {
  console.warn('⚠️  Could not load .env.local:', error instanceof Error ? error.message : 'Unknown error')
}

import '../lib/env'
import { identifyCrystal } from '../lib/replicate'

const testCrystals = [
  { id: 4, name: 'Rubellite in Granite', imageId: 84, expectedColors: ['pink', 'white', 'black'] },
  { id: 34, name: 'Super Seven', imageId: null, expectedColors: ['purple', 'brown', 'yellow', 'red', 'clear'] },
  { id: 6, name: 'Smokey Quartz', imageId: null, expectedColors: ['brown', 'gray', 'black'] },
  { id: 11, name: 'Angel Aura Quartz', imageId: null, expectedColors: ['rainbow', 'iridescent'] },
  { id: 45, name: 'Azurite Malachite', imageId: null, expectedColors: ['blue', 'green'] },
]

async function testCrystal(crystal: typeof testCrystals[0]) {
  console.log(`\n${'='.repeat(60)}`)
  console.log(`🔍 Testing: ${crystal.name}`)
  console.log(`${'='.repeat(60)}`)
  
  // Try to get image URL - use Next.js Image Optimization API
  let imageUrl: string
  if (crystal.imageId) {
    imageUrl = `https://www.crystalindex.co.uk/_next/image?url=%2Fapi%2Fimage%2F${crystal.imageId}&w=1080&q=100`
  } else {
    // Try to fetch from crystal page
    try {
      const response = await fetch(`https://www.crystalindex.co.uk/crystals/${crystal.id}`)
      const html = await response.text()
      const imageMatch = html.match(/src="[^"]*image[^"]*"/)
      if (imageMatch) {
        const urlMatch = imageMatch[0].match(/url=%2Fapi%2Fimage%2F(\d+)/)
        if (urlMatch) {
          const imgId = urlMatch[1]
          imageUrl = `https://www.crystalindex.co.uk/_next/image?url=%2Fapi%2Fimage%2F${imgId}&w=1080&q=100`
        } else {
          console.log(`⚠️  Could not extract image ID for ${crystal.name}, skipping...`)
          return
        }
      } else {
        console.log(`⚠️  Could not find image for ${crystal.name}, skipping...`)
        return
      }
    } catch (error) {
      console.log(`⚠️  Error fetching crystal page: ${error instanceof Error ? error.message : 'Unknown error'}`)
      return
    }
  }
  
  console.log(`📸 Image URL: ${imageUrl}`)
  
  try {
    const startTime = Date.now()
    const result = await identifyCrystal(imageUrl)
    const duration = Date.now() - startTime

    console.log(`\n✅ Identification complete! (${duration}ms)`)
    console.log(`\n📊 Results:`)
    console.log('─'.repeat(60))
    
    result.topMatches.forEach((match, index) => {
      const confidencePercent = (match.confidence * 100).toFixed(1)
      const bar = '█'.repeat(Math.floor(match.confidence * 20))
      const isCorrect = match.crystal.toLowerCase().includes(crystal.name.toLowerCase().split(' ')[0]) ||
                       crystal.name.toLowerCase().split(' ').some(word => match.crystal.toLowerCase().includes(word))
      const marker = isCorrect ? '✓' : ' '
      console.log(`${marker} ${(index + 1).toString().padStart(2)}. ${match.crystal.padEnd(30)} ${confidencePercent.padStart(6)}% ${bar}`)
    })
    
    console.log('─'.repeat(60))
    const topMatch = result.topMatches[0]
    if (topMatch) {
      const isCorrect = topMatch.crystal.toLowerCase().includes(crystal.name.toLowerCase().split(' ')[0]) ||
                       crystal.name.toLowerCase().split(' ').some(word => topMatch.crystal.toLowerCase().includes(word))
      const status = isCorrect ? '✅ CORRECT' : '❌ INCORRECT'
      console.log(`🎯 Top Match: ${topMatch.crystal} ${status}`)
      console.log(`💯 Confidence: ${(topMatch.confidence * 100).toFixed(1)}%`)
      console.log(`📝 Expected: ${crystal.name}`)
    }
  } catch (error) {
    console.error(`❌ Error:`, error)
  }
}

async function runAllTests() {
  console.log('🧪 Testing Crystal Identification System')
  console.log(`📦 Testing ${testCrystals.length} crystals\n`)
  
  for (const crystal of testCrystals) {
    await testCrystal(crystal)
    // Small delay between tests to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 2000))
  }
  
  console.log(`\n${'='.repeat(60)}`)
  console.log('✨ All tests complete!')
  console.log(`${'='.repeat(60)}\n`)
}

runAllTests()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Test suite failed:', error)
    process.exit(1)
  })


