import { readFileSync, writeFileSync } from 'node:fs'
import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'

const RUST_CLIENT_SRC = path.join(process.cwd(), 'jup-perps-client-rust/src')

// Function mappings and their descriptions
const FUNCTION_DOCS = {
	fetch_pool: 'Fetches Jupiter Perpetuals liquidity pool data from Solana',
	fetch_perpetuals: 'Fetches Jupiter Perpetuals main protocol account data',
	fetch_position: 'Fetches trader position data',
	fetch_custody: 'Fetches token custody data from a pool',
	fetch_token_ledger: 'Fetches token ledger data',
	fetch_position_request: 'Fetches position request data',

	fetch_maybe_pool: 'Safely fetches pool data (returns None if not found)',
	fetch_maybe_perpetuals:
		'Safely fetches protocol data (returns None if not found)',
	fetch_maybe_position:
		'Safely fetches position data (returns None if not found)',

	fetch_all_pool: 'Fetches multiple pool accounts in batch',
	fetch_all_perpetuals: 'Fetches multiple protocol accounts in batch',
	fetch_all_position: 'Fetches multiple position accounts in batch',

	from_bytes: 'Deserializes account data from raw bytes',
}

// Types and their descriptions
const TYPE_DOCS = {
	Pool: 'Jupiter Perpetuals liquidity pool containing custody accounts and fees',
	Perpetuals: 'Main Jupiter Perpetuals protocol configuration account',
	Position: 'Individual trader position with size, collateral, and P&L data',
	Custody: 'Token custody account managing assets and oracle pricing in a pool',
	TokenLedger: 'Token accounting ledger for tracking balances',
	PositionRequest: 'Pending position modification request',
	PerpetualsError: 'Jupiter Perpetuals protocol error codes',

	// Common types
	Assets: 'Asset amounts including owned, locked, and fee reserves',
	Fees: 'Fee configuration for swaps, positions, and liquidity operations',
	Limit: 'Position and pool size limits',
	OracleParams: 'Oracle configuration and pricing parameters',
	Side: 'Position side: Long or Short',
	TradePoolType: 'Trade type: Increase or Decrease position',
}

const addRustDocToFunction = (
	content: string,
	functionName: string,
	description: string,
): string => {
	// Patterns for finding functions
	const patterns = [
		// pub fn fetch_pool(
		new RegExp(`(pub fn ${functionName}\\([^)]*\\)[^{]*\\{)`, 'g'),
		// #[cfg(feature = "fetch")]\npub fn fetch_pool(
		new RegExp(
			`(#\\[cfg\\(feature = "fetch"\\)\\]\\s*pub fn ${functionName}\\([^)]*\\)[^{]*\\{)`,
			'g',
		),
	]

	const rustDoc = `/// ${description}
/// 
/// # Arguments
/// * \`rpc\` - Solana RPC client
/// * \`address\` - Account address to fetch
/// 
/// # Returns
/// * \`Result<T, std::io::Error>\` - Decoded account data or error
`

	for (const pattern of patterns) {
		if (pattern.test(content)) {
			content = content.replace(pattern, `${rustDoc}$1`)
			break
		}
	}

	return content
}

const addRustDocToType = (
	content: string,
	typeName: string,
	description: string,
): string => {
	// Patterns for finding types
	const patterns = [
		// pub struct Pool {
		new RegExp(`(pub struct ${typeName} \\{)`, 'g'),
		// pub enum PerpetualsError {
		new RegExp(`(pub enum ${typeName} \\{)`, 'g'),
		// #[derive(...)]\npub struct Pool {
		new RegExp(
			`(#\\[derive\\([^\\]]*\\)\\](?:\\s*#\\[[^\\]]*\\])*\\s*pub struct ${typeName} \\{)`,
			'g',
		),
		// #[derive(...)]\npub enum PerpetualsError {
		new RegExp(
			`(#\\[derive\\([^\\]]*\\)\\](?:\\s*#\\[[^\\]]*\\])*\\s*pub enum ${typeName} \\{)`,
			'g',
		),
	]

	const rustDoc = `/// ${description}
`

	for (const pattern of patterns) {
		if (pattern.test(content)) {
			content = content.replace(pattern, `${rustDoc}$1`)
			break
		}
	}

	return content
}

const processDirectory = async (dirPath: string): Promise<void> => {
	try {
		const entries = await readdir(dirPath)

		for (const entry of entries) {
			const fullPath = path.join(dirPath, entry)
			const stats = await stat(fullPath)

			if (stats.isDirectory()) {
				// Skip target directory
				if (entry !== 'target') {
					await processDirectory(fullPath)
				}
			} else if (entry.endsWith('.rs')) {
				await addRustDocsToFile(fullPath)
			}
		}
	} catch (error) {
		console.error(`❌ Error processing directory ${dirPath}:`, error)
	}
}

const addRustDocsToFile = async (filePath: string): Promise<void> => {
	try {
		let content = readFileSync(filePath, 'utf-8')
		let modified = false

		// Skip if already has docs or is an example
		if (content.includes('///') || filePath.includes('examples/')) {
			return
		}

		// Add docs to functions
		for (const [functionName, description] of Object.entries(FUNCTION_DOCS)) {
			const originalContent = content
			content = addRustDocToFunction(content, functionName, description)
			if (content !== originalContent) {
				modified = true
			}
		}

		// Add docs to types
		for (const [typeName, description] of Object.entries(TYPE_DOCS)) {
			const originalContent = content
			content = addRustDocToType(content, typeName, description)
			if (content !== originalContent) {
				modified = true
			}
		}

		if (modified) {
			writeFileSync(filePath, content)
			console.log(`✅ Added docs to: ${path.relative(process.cwd(), filePath)}`)
		}
	} catch (error) {
		console.error(`❌ Error processing ${filePath}:`, error)
	}
}

const addRustDocs = async (): Promise<void> => {
	console.log('📝 Adding Rust doc comments to generated code...')
	await processDirectory(RUST_CLIENT_SRC)
	console.log('🎉 Rust doc comments added!')
}

// Execute
if (import.meta.main) {
	addRustDocs().catch(console.error)
}

export { addRustDocs }
