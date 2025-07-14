#!/usr/bin/env bun

import path from 'node:path'
import { type AnchorIdl, rootNodeFromAnchor } from '@codama/nodes-from-anchor'
import { renderVisitor } from '@codama/renderers-js'
import { createFromRoot } from 'codama'
import anchorIdl from './idl/jupiter-perpetuals.json'

function generateClient() {
  console.log('🚀 Generating Jupiter Perps client...')
  
  try {
    // 1. Convert Anchor IDL to Codama root node
    console.log('📄 Processing IDL...')
    const codama = createFromRoot(rootNodeFromAnchor(anchorIdl as AnchorIdl))
    
    // 2. Check if address exists in IDL and display it
    if (anchorIdl.address) {
      console.log(`📍 Program Address: ${anchorIdl.address}`)
    }
    
    // 3. Configure generation path
    const pathToGeneratedFolder = path.join(process.cwd(), 'src/generated')
    console.log(`📁 Generation path: ${pathToGeneratedFolder}`)
    
    // 4. Options for generator (only supported renderVisitor options)
    const options = {
      // Code formatting with Prettier
      formatCode: true,
      
      // Clear folder before generation
      deleteFolderBeforeRendering: true,
      
      // Basic Prettier options
      prettierOptions: {
        semi: false,
        singleQuote: true,
      }
    }
    
    // 5. Generate code
    console.log('🔧 Generating TypeScript code...')
    codama.accept(renderVisitor(pathToGeneratedFolder, options))
    
    console.log('✅ Client successfully generated in src/generated/')
    
  } catch (error) {
    console.error('❌ Generation error:', error)
    process.exit(1)
  }
}

// Run generation
if (import.meta.main) {
  generateClient()
}