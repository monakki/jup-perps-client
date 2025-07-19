import { spawn } from 'bun'
import { OUTPUT_PATH as JS_OUTPUT_PATH } from './js/generate.ts'
import { OUTPUT_PATH as RUST_OUTPUT_PATH } from './rust/generate.ts'

// Constants
const SCRIPTS = {
	JS_GENERATE: 'generator/js/generate.ts',
	JS_JSDOC: 'generator/js/add-jsdoc.ts',
	RUST_GENERATE: 'generator/rust/generate.ts',
	RUST_DOCS: 'generator/rust/add-rust-docs.ts',
} as const

const LOG_MESSAGES = {
	START: '🚀 Generating all Jupiter Perps clients...',
	JS_START: '\n📦 Generating JavaScript/TypeScript client...',
	JSDOC_START: '\n📝 Adding JSDoc comments...',
	RUST_START: '\n🦀 Generating Rust client...',
	RUST_DOCS_START: '\n📝 Adding Rust doc comments...',
	PARALLEL_START: '\n⚡ Running JS and Rust generation in parallel...',
	SUCCESS: '\n✅ All clients generated successfully!',
	JS_PATH: `📁 JavaScript: ${JS_OUTPUT_PATH}/`,
	RUST_PATH: `📁 Rust: ${RUST_OUTPUT_PATH}/`,
	ERROR: '❌ Generation failed:',
	STEP_ERROR: '❌ Step failed:',
} as const

// Helper function to run generation steps with proper error handling
const runStep = async (command: string[], stepName: string): Promise<void> => {
	console.log(`🔄 Starting: ${stepName}...`)

	try {
		const process = spawn(command, { stdio: ['inherit', 'inherit', 'inherit'] })
		const exitCode = await process.exited

		if (exitCode !== 0) {
			throw new Error(`Process exited with code ${exitCode}`)
		}

		console.log(`✅ Completed: ${stepName}`)
	} catch (error) {
		console.error(`${LOG_MESSAGES.STEP_ERROR} ${stepName}`)
		console.error(`📝 Command: ${command.join(' ')}`)
		throw error
	}
}

// Helper function to run steps in parallel
const runStepsInParallel = async (
	steps: Array<{ command: string[]; name: string }>,
): Promise<void> => {
	console.log(`⚡ Running ${steps.length} steps in parallel...`)

	try {
		const promises = steps.map((step) => runStep(step.command, step.name))
		await Promise.all(promises)
		console.log(`✅ All parallel steps completed successfully`)
	} catch (error) {
		console.error(`❌ Parallel execution failed`)
		throw error
	}
}

const generateAllClients = async () => {
	console.log(LOG_MESSAGES.START)
	const startTime = Date.now()

	try {
		// Option 1: Sequential generation (safer for debugging)
		if (process.argv.includes('--sequential')) {
			console.log('📋 Running in sequential mode...')

			// Generate JS client
			console.log(LOG_MESSAGES.JS_START)
			await runStep(
				['bun', SCRIPTS.JS_GENERATE],
				'JavaScript client generation',
			)

			// Add JSDoc to JS client
			console.log(LOG_MESSAGES.JSDOC_START)
			await runStep(['bun', SCRIPTS.JS_JSDOC], 'JSDoc comments addition')

			// Generate Rust client
			console.log(LOG_MESSAGES.RUST_START)
			await runStep(['bun', SCRIPTS.RUST_GENERATE], 'Rust client generation')

			// Add Rust docs to Rust client
			console.log(LOG_MESSAGES.RUST_DOCS_START)
			await runStep(['bun', SCRIPTS.RUST_DOCS], 'Rust documentation addition')
		} else {
			// Option 2: Parallel generation (faster)
			console.log(LOG_MESSAGES.PARALLEL_START)

			await runStepsInParallel([
				{
					command: ['bun', SCRIPTS.JS_GENERATE],
					name: 'JavaScript client generation',
				},
				{
					command: ['bun', SCRIPTS.RUST_GENERATE],
					name: 'Rust client generation',
				},
			])

			// Add documentation comments after generation completes
			console.log(LOG_MESSAGES.JSDOC_START)
			await runStepsInParallel([
				{ command: ['bun', SCRIPTS.JS_JSDOC], name: 'JSDoc comments addition' },
				{
					command: ['bun', SCRIPTS.RUST_DOCS],
					name: 'Rust documentation addition',
				},
			])
		}

		const endTime = Date.now()
		const duration = ((endTime - startTime) / 1000).toFixed(2)

		console.log(LOG_MESSAGES.SUCCESS)
		console.log(`⏱️  Total time: ${duration}s`)
		console.log(LOG_MESSAGES.JS_PATH)
		console.log(LOG_MESSAGES.RUST_PATH)

		console.log('\n🎯 Ready to use:')
		console.log('   • JS/TS: import from jup-perps-client-js/')
		console.log('   • Rust: add jup-perps-client-rust as dependency')
		console.log('\n💡 Tips:')
		console.log('   • Use --sequential flag for debugging')
		console.log('   • Test JS: bun run example:js')
		console.log('   • Test Rust: bun run example:rust')
		console.log(
			'   • Rust RPC functions work out of the box (fetch feature enabled by default)',
		)
	} catch (error) {
		console.error(LOG_MESSAGES.ERROR, error)
		console.error('\n🔍 Troubleshooting:')
		console.error('   • Try running with --sequential flag')
		console.error('   • Check that Bun is installed and working')
		console.error('   • Ensure all generator scripts exist')
		process.exit(1)
	}
}

if (import.meta.main) {
	generateAllClients()
}
