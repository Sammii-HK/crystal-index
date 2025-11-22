#!/usr/bin/env tsx
/**
 * Remove duplicate crystal entries from crystal-context.ts
 * Keeps the first occurrence, removes subsequent duplicates
 */

import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const filePath = resolve(process.cwd(), 'lib/crystal-context.ts')
let content = readFileSync(filePath, 'utf-8')

// Find all crystal entries
const lines = content.split('\n')
const seen = new Set<string>()
let inCrystal = false
let crystalName = ''
let crystalStart = -1
let crystalEnd = -1
const toRemove: Array<{ start: number; end: number; name: string }> = []

for (let i = 0; i < lines.length; i++) {
  const line = lines[i]
  
  // Check if this is a crystal definition start
  const nameMatch = line.match(/^\s+"([^"]+)":\s*\{/)
  if (nameMatch) {
    // If we were in a crystal, mark its end
    if (inCrystal && crystalStart >= 0) {
      crystalEnd = i - 1
      if (seen.has(crystalName)) {
        toRemove.push({ start: crystalStart, end: crystalEnd, name: crystalName })
      } else {
        seen.add(crystalName)
      }
    }
    
    crystalName = nameMatch[1]
    crystalStart = i
    inCrystal = true
  }
  
  // Check if this is the end of a crystal (closing brace followed by comma or closing brace of object)
  if (inCrystal && line.trim() === '},' && crystalStart >= 0) {
    crystalEnd = i
    if (seen.has(crystalName)) {
      toRemove.push({ start: crystalStart, end: crystalEnd, name: crystalName })
    } else {
      seen.add(crystalName)
    }
    inCrystal = false
    crystalStart = -1
  }
}

// Handle last crystal if file doesn't end with comma
if (inCrystal && crystalStart >= 0) {
  crystalEnd = lines.length - 1
  if (seen.has(crystalName)) {
    toRemove.push({ start: crystalStart, end: crystalEnd, name: crystalName })
  }
}

console.log(`Found ${toRemove.length} duplicate entries to remove:`)
toRemove.forEach(({ name, start, end }) => {
  console.log(`  - ${name} (lines ${start + 1}-${end + 1})`)
})

// Remove duplicates (in reverse order to maintain line numbers)
toRemove.sort((a, b) => b.start - a.start)
let removed = 0
for (const { start, end } of toRemove) {
  lines.splice(start, end - start + 1)
  removed += (end - start + 1)
}

const newContent = lines.join('\n')
writeFileSync(filePath, newContent, 'utf-8')

console.log(`\n✅ Removed ${removed} lines (${toRemove.length} duplicate entries)`)
console.log(`📝 File updated: ${filePath}`)


