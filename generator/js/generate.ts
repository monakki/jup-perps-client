import { execSync } from 'node:child_process'
import { mkdirSync, rmSync } from 'node:fs'
import path from 'node:path'
import { type AnchorIdl, rootNodeFromAnchor } from '@codama/nodes-from-anchor'
import { renderJavaScriptVisitor } from '@codama/renderers'
import { updateProgramsVisitor } from '@codama/visitors'
import { createFromRoot } from 'codama'
import anchorIdl from '../idl/jupiter-perpetuals.json'

// Constants
const CLIENT_DIR = 'js-client'
const SRC_DIR = `${CLIENT_DIR}/src`
export const OUTPUT_PATH = CLIENT_DIR

export const LOG_MESSAGES = {
	START: '🚀 Generating ready-to-publish npm package...',
	PROCESSING: '📄 Processing IDL...',
	GENERATING: '🔧 Generating TypeScript code...',
	COMPILING: '⚙️ Compiling TypeScript to JavaScript...',
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
	// Generate pure JavaScript instead of TypeScript
	typeScript: false,
} as const

const generateClient = () => {
	console.log(LOG_MESSAGES.START)

	try {
		// 1. Clean src/ directory only
		console.log('🧹 Cleaning src directory...')
		rmSync(SRC_DIR, { recursive: true, force: true })
		mkdirSync(SRC_DIR, { recursive: true })

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

		// 4. Configure generation path - generate to src/
		const pathToGeneratedFolder = path.join(process.cwd(), SRC_DIR)
		console.log(`📁 Generation path: ${pathToGeneratedFolder}`)

		// 5. Generate TypeScript code to src/
		console.log(LOG_MESSAGES.GENERATING)
		codama.accept(
			renderJavaScriptVisitor(pathToGeneratedFolder, GENERATION_OPTIONS),
		)

		// 6. Generation complete - compile manually with: bun run compile:js
		console.log('✅ Generation complete!')
		console.log('💡 Next step: Run "bun run compile:js" to compile TypeScript')

		console.log(LOG_MESSAGES.SUCCESS)
		console.log('📊 Package contents:')

		// 9. Show package contents
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
