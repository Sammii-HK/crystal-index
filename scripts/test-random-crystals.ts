#!/usr/bin/env tsx
/**
 * Test script for random crystal identifications
 * Usage: tsx scripts/test-random-crystals.ts [crystal-id-1] [crystal-id-2] ...
 * Or: tsx scripts/test-random-crystals.ts --random 5
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

async function fetchCrystalInfo(crystalId: number): Promise<{ name: string; imageId: number | null } | null> {
  try {
    const response = await fetch(`https://www.crystalindex.co.uk/crystals/${crystalId}`)
    if (!response.ok) {
      return null
    }
    const html = await response.text()
    
    // Extract crystal name from page title or h1
    const titleMatch = html.match(/<title>([^<]+)<\/title>/)
    const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/)
    const name = h1Match?.[1]?.trim() || titleMatch?.[1]?.replace(' - Crystal Index', '').trim() || `Crystal ${crystalId}`
    
    // Extract image ID
    const imageMatch = html.match(/src="[^"]*image[^"]*"/)
    let imageId: number | null = null
    if (imageMatch) {
      const urlMatch = imageMatch[0].match(/url=%2Fapi%2Fimage%2F(\d+)/)
      if (urlMatch) {
        imageId = parseInt(urlMatch[1])
      }
    }
    
    return { name, imageId }
  } catch (error) {
    console.error(`Error fetching crystal ${crystalId}:`, error)
    return null
  }
}

async function testCrystal(crystalId: number) {
  console.log(`\n${'='.repeat(60)}`)
  console.log(`🔍 Testing Crystal ID: ${crystalId}`)
  console.log(`${'='.repeat(60)}`)
  
  // Fetch crystal info
  const crystalInfo = await fetchCrystalInfo(crystalId)
  if (!crystalInfo) {
    console.log(`⚠️  Could not fetch crystal info for ID ${crystalId}`)
    return
  }
  
  console.log(`📝 Crystal Name: ${crystalInfo.name}`)
  
  if (!crystalInfo.imageId) {
    console.log(`⚠️  No image found for ${crystalInfo.name}`)
    return
  }
  
  const imageUrl = `https://www.crystalindex.co.uk/_next/image?url=%2Fapi%2Fimage%2F${crystalInfo.imageId}&w=1080&q=100`
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
      const isCorrect = match.crystal.toLowerCase() === crystalInfo.name.toLowerCase() ||
                       crystalInfo.name.toLowerCase().split(' ').some(word => 
                         word.length > 3 && match.crystal.toLowerCase().includes(word.toLowerCase())
                       )
      const marker = isCorrect ? '✅' : '  '
      console.log(`${marker} ${(index + 1).toString().padStart(2)}. ${match.crystal.padEnd(35)} ${confidencePercent.padStart(6)}% ${bar}`)
    })
    
    console.log('─'.repeat(60))
    const topMatch = result.topMatches[0]
    let isCorrect = false
    if (topMatch) {
      isCorrect = topMatch.crystal.toLowerCase() === crystalInfo.name.toLowerCase() ||
                       crystalInfo.name.toLowerCase().split(' ').some(word => 
                         word.length > 3 && topMatch.crystal.toLowerCase().includes(word.toLowerCase())
                       )
      const status = isCorrect ? '✅ CORRECT' : '❌ INCORRECT'
      console.log(`🎯 Top Match: ${topMatch.crystal} ${status}`)
      console.log(`💯 Confidence: ${(topMatch.confidence * 100).toFixed(1)}%`)
      console.log(`📝 Expected: ${crystalInfo.name}`)
    }
    
    return { crystalId, name: crystalInfo.name, topMatch: topMatch?.crystal, correct: isCorrect }
  } catch (error) {
    console.error(`❌ Error:`, error)
    return null
  }
}

async function main() {
  const args = process.argv.slice(2)
  
  let crystalIds: number[] = []
  
  if (args[0] === '--random' && args[1]) {
    // Random mode: test N random crystals
    const count = parseInt(args[1])
    if (isNaN(count) || count < 1) {
      console.error('Usage: tsx scripts/test-random-crystals.ts --random <count>')
      process.exit(1)
    }
    
    // Try to get a range of IDs (we'll test IDs 1-100 and see which exist)
    console.log(`🎲 Testing ${count} random crystals...`)
    const testIds = Array.from({ length: 200 }, (_, i) => i + 1)
    const shuffled = testIds.sort(() => Math.random() - 0.5)
    crystalIds = shuffled.slice(0, count)
  } else {
    // Test specific IDs provided
    crystalIds = args.map(arg => parseInt(arg)).filter(id => !isNaN(id))
    
    if (crystalIds.length === 0) {
      console.log('Usage:')
      console.log('  tsx scripts/test-random-crystals.ts <id1> <id2> ...')
      console.log('  tsx scripts/test-random-crystals.ts --random <count>')
      console.log('\nExample:')
      console.log('  tsx scripts/test-random-crystals.ts 4 34 6 11 45')
      console.log('  tsx scripts/test-random-crystals.ts --random 10')
      process.exit(1)
    }
  }
  
  console.log('🧪 Testing Crystal Identification System')
  console.log(`📦 Testing ${crystalIds.length} crystals\n`)
  
  const results: Array<{ crystalId: number; name: string; topMatch: string | undefined; correct: boolean | undefined }> = []
  
  for (const id of crystalIds) {
    const result = await testCrystal(id)
    if (result) {
      results.push(result)
    }
    // Small delay between tests to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 2000))
  }
  
  // Summary
  console.log(`\n${'='.repeat(60)}`)
  console.log('📊 SUMMARY')
  console.log(`${'='.repeat(60)}`)
  const correct = results.filter(r => r.correct).length
  const total = results.length
  const accuracy = total > 0 ? ((correct / total) * 100).toFixed(1) : '0'
  console.log(`✅ Correct: ${correct}/${total} (${accuracy}%)`)
  console.log(`❌ Incorrect: ${total - correct}/${total}`)
  console.log(`${'='.repeat(60)}\n`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Test suite failed:', error)
    process.exit(1)
  })

