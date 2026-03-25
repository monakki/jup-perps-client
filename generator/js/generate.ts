import { execSync } from 'node:child_process'
import { rmSync } from 'node:fs'
import path from 'node:path'
import { type AnchorIdl, rootNodeFromAnchor } from '@codama/nodes-from-anchor'
import { renderVisitor } from '@codama/renderers-js'
import { updateProgramsVisitor } from '@codama/visitors'
import { createFromRoot } from 'codama'
import anchorIdl from '../idl/jupiter-perpetuals.json'

// Constants
const CLIENT_DIR = 'jup-perps-client-js'
export const OUTPUT_PATH = CLIENT_DIR

export const LOG_MESSAGES = {
	START: '🚀 Generating ready-to-publish npm package...',
	PROCESSING: '📄 Processing IDL...',
	GENERATING: '🔧 Generating TypeScript code...',
	SUCCESS: `✅ Ready npm package created in ${CLIENT_DIR}/`,
	ERROR: '❌ Generation error:',
} as const

const GENERATION_OPTIONS = {
	formatCode: true,
	deleteFolderBeforeRendering: true,
	prettierOptions: {
		semi: false,
		singleQuote: true,
	},
	// generatedFolder defaults to 'src/generated'
} as const

const generateClient = () => {
	console.log(LOG_MESSAGES.START)

	try {
		// 1. Clean generated directory
		console.log('🧹 Cleaning generated directory...')
		rmSync(path.join(CLIENT_DIR, 'src', 'generated'), {
			recursive: true,
			force: true,
		})

		// 2. Convert Anchor IDL to Codama root node
		console.log(LOG_MESSAGES.PROCESSING)
		const codama = createFromRoot(rootNodeFromAnchor(anchorIdl as AnchorIdl))

		// 3. Update program address from IDL
		if (anchorIdl.address) {
			console.log(`📍 Program Address: ${anchorIdl.address}`)
			codama.update(
				updateProgramsVisitor({
					perpetuals: { publicKey: anchorIdl.address },
				}),
			)
		}

		// 4. Pass package folder — renderVisitor generates into src/generated inside it
		const packageFolder = path.join(process.cwd(), CLIENT_DIR)
		console.log(`📁 Generation path: ${packageFolder}/src/generated`)

		// 5. Generate TypeScript code
		console.log(LOG_MESSAGES.GENERATING)
		codama.accept(renderVisitor(packageFolder, GENERATION_OPTIONS))

		console.log('✅ Generation complete!')
		console.log('💡 Next step: Run "bun run compile:js" to compile TypeScript')

		console.log(LOG_MESSAGES.SUCCESS)
		console.log('📊 Package contents:')

		execSync('npm pack --dry-run', {
			cwd: path.join(process.cwd(), CLIENT_DIR),
			stdio: 'inherit',
		})
	} catch (error) {
		console.error(LOG_MESSAGES.ERROR, error)
		process.exit(1)
	}
}

// Run generation
if (import.meta.main) {
	generateClient()
}
