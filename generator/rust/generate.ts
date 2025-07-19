#!/usr/bin/env bun

import { access, copyFile } from 'node:fs/promises'
import path from 'node:path'
import { type AnchorIdl, rootNodeFromAnchor } from '@codama/nodes-from-anchor'
import { renderRustVisitor } from '@codama/renderers'
import { createFromRoot } from 'codama'
import anchorIdl from '../idl/jupiter-perpetuals.json'
import { fixImports } from './fix-imports.ts'

// Function to create lib.rs from mod.rs
const createLibFromMod = async () => {
	const modPath = path.join(process.cwd(), OUTPUT_PATH, 'mod.rs')
	const libPath = path.join(process.cwd(), OUTPUT_PATH, 'lib.rs')

	try {
		// Check if mod.rs exists
		await access(modPath)

		// Copy mod.rs to lib.rs
		await copyFile(modPath, libPath)

		console.log('✅ Created lib.rs from mod.rs')
	} catch (error) {
		console.warn('⚠️ Could not create lib.rs from mod.rs:', error)
	}
}

// Constants
export const OUTPUT_PATH = 'jup-perps-client-rust/src'
export const LOG_MESSAGES = {
	START: '🦀 Generating Jupiter Perps Rust client...',
	PROCESSING: '📄 Processing IDL...',
	GENERATING: '🔧 Generating Rust code...',
	SUCCESS: `✅ Rust client successfully generated in${OUTPUT_PATH}`,
	ERROR: '❌ Rust generation error:',
} as const

const GENERATION_OPTIONS = {
	deleteFolderBeforeRendering: true,
	formatCode: true,
	toolchain: '+stable',
	crateFolder: 'jup-perps-client-rust',
	anchorTraits: false,
	renderParentInstructions: false,
	dependencyMap: {
		solana_program: 'solana_program',
		solana_cpi: 'solana_program::program',
		solana_account_info: 'solana_program::account_info',
		solana_instruction: 'solana_program::instruction',
		solana_program_entrypoint: 'solana_program::entrypoint',
		solana_pubkey: 'solana_program::pubkey',
		solana_program_error: 'solana_program::program_error',
		solana_decode_error: 'solana_program::decode_error',
	},
}

const generateRustClient = async () => {
	console.log(LOG_MESSAGES.START)

	try {
		// 1. Convert Anchor IDL to Codama root node
		console.log(LOG_MESSAGES.PROCESSING)
		const codama = createFromRoot(rootNodeFromAnchor(anchorIdl as AnchorIdl))

		// 2. Check if address exists in IDL and display it
		if (anchorIdl.address) {
			console.log(`📍 Program Address: ${anchorIdl.address}`)
		}

		// 3. Configure generation path
		const pathToGeneratedFolder = path.join(process.cwd(), OUTPUT_PATH)
		console.log(`📁 Generation path: ${pathToGeneratedFolder}`)

		// 4. Generate Rust code
		console.log(LOG_MESSAGES.GENERATING)
		codama.accept(renderRustVisitor(pathToGeneratedFolder, GENERATION_OPTIONS))

		// 5. Fix Solana imports
		console.log('🔧 Fixing Solana imports...')
		await fixImports()

		// 6. Create lib.rs from mod.rs for library compatibility
		console.log('📚 Creating lib.rs from mod.rs...')
		await createLibFromMod()

		console.log(LOG_MESSAGES.SUCCESS)
	} catch (error) {
		console.error(LOG_MESSAGES.ERROR, error)
		process.exit(1)
	}
}

// Run generation
if (import.meta.main) {
	await generateRustClient()
}
