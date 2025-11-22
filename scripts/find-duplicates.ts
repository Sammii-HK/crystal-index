#!/usr/bin/env tsx
/**
 * Find duplicate crystal entries in crystal-context.ts
 */

import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const filePath = resolve(process.cwd(), 'lib/crystal-context.ts')
const content = readFileSync(filePath, 'utf-8')

// Find all crystal name definitions
const crystalNameRegex = /^\s+"([^"]+)":\s*\{/gm
const matches = [...content.matchAll(crystalNameRegex)]

const crystalNames = matches.map(m => ({
  name: m[1],
  line: content.substring(0, m.index).split('\n').length
}))

// Find duplicates
const nameCounts = new Map<string, number[]>()
crystalNames.forEach(({ name, line }) => {
  if (!nameCounts.has(name)) {
    nameCounts.set(name, [])
  }
  nameCounts.get(name)!.push(line)
})

const duplicates = Array.from(nameCounts.entries())
  .filter(([_, lines]) => lines.length > 1)
  .map(([name, lines]) => ({ name, lines }))

console.log(`Found ${duplicates.length} duplicate crystal entries:\n`)
duplicates.forEach(({ name, lines }) => {
  console.log(`${name}:`)
  lines.forEach(line => console.log(`  - Line ${line}`))
  console.log()
})

if (duplicates.length > 0) {
  console.log(`\nTotal duplicates: ${duplicates.reduce((sum, d) => sum + d.lines.length - 1, 0)}`)
  console.log('\nTo fix: Keep the first occurrence, remove the rest.')
}


