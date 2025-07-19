import { readFileSync, writeFileSync } from 'node:fs'

// Function mappings and their descriptions
const FUNCTION_DOCS = {
	fetchPool: 'Fetches Jupiter Perpetuals liquidity pool data',
	fetchPerpetuals: 'Fetches Jupiter Perpetuals main protocol account data',
	fetchPosition: 'Fetches trader position data',
	fetchCustody: 'Fetches token custody data',
	fetchTokenLedger: 'Fetches token ledger data',
	fetchPositionRequest: 'Fetches position request data',

	fetchMaybePool: 'Safely fetches pool data (may return null)',
	fetchMaybePerpetuals: 'Safely fetches protocol data (may return null)',
	fetchMaybePosition: 'Safely fetches position data (may return null)',

	fetchAllPool: 'Fetches multiple pool data',
	fetchAllPerpetuals: 'Fetches multiple protocol data',
	fetchAllPosition: 'Fetches multiple position data',

	identifyPerpetualsAccount: 'Identifies Jupiter Perpetuals account type',
	identifyPerpetualsInstruction:
		'Identifies Jupiter Perpetuals instruction type',

	decodePool: 'Decodes pool data from raw account',
	decodePerpetuals: 'Decodes protocol data from raw account',
	decodePosition: 'Decodes position data from raw account',
	decodeCustody: 'Decodes custody data from raw account',
}

// Types and their descriptions
const TYPE_DOCS = {
	Pool: 'Jupiter Perpetuals liquidity pool data',
	Perpetuals: 'Jupiter Perpetuals main protocol account data',
	Position: 'Trader position data',
	Custody: 'Token custody data in pool',
	TokenLedger: 'Token ledger data',
	PositionRequest: 'Position request data',

	PerpetualsAccount: 'Jupiter Perpetuals account types enum',
	PerpetualsInstruction: 'Jupiter Perpetuals instruction types enum',
}

const addJSDocToFunction = (
	content: string,
	functionName: string,
	description: string,
): string => {
	// Patterns for finding functions
	const patterns = [
		// export async function fetchPool<...>
		new RegExp(
			`(export async function ${functionName}<[^>]*>\\([^)]*\\):[^{]*{)`,
			'g',
		),
		// export async function fetchPool(
		new RegExp(
			`(export async function ${functionName}\\([^)]*\\):[^{]*{)`,
			'g',
		),
		// export function decodePool<...>
		new RegExp(
			`(export function ${functionName}<[^>]*>\\([^)]*\\):[^{]*{?)`,
			'g',
		),
		// export function identifyPerpetualsAccount(
		new RegExp(`(export function ${functionName}\\([^)]*\\):[^{]*{?)`, 'g'),
	]

	const jsDoc = `/**\n * ${description}\n * @param rpc - Solana RPC client\n * @param address - Account address\n * @returns Account data\n */\n`

	for (const pattern of patterns) {
		if (pattern.test(content)) {
			content = content.replace(pattern, `${jsDoc}$1`)
			break
		}
	}

	return content
}

const addJSDocToType = (
	content: string,
	typeName: string,
	description: string,
): string => {
	// Patterns for finding types
	const patterns = [
		// export type Pool = {
		new RegExp(`(export type ${typeName} = \\{)`, 'g'),
		// export enum PerpetualsAccount {
		new RegExp(`(export enum ${typeName} \\{)`, 'g'),
		// export interface Pool {
		new RegExp(`(export interface ${typeName} \\{)`, 'g'),
	]

	const jsDoc = `/**\n * ${description}\n */\n`

	for (const pattern of patterns) {
		if (pattern.test(content)) {
			content = content.replace(pattern, `${jsDoc}$1`)
			break
		}
	}

	return content
}

const addJSDocToFiles = async () => {
	console.log('📝 Adding JSDoc comments to generated code...')

	// Find all TypeScript files in generated folder using built-in Bun glob
	const glob = new Bun.Glob('clients/js/src/generated/**/*.ts')
	const files = await Array.fromAsync(glob.scan('.'))

	for (const filePath of files) {
		let content = readFileSync(filePath, 'utf-8')
		let modified = false

		// Add JSDoc to functions
		for (const [functionName, description] of Object.entries(FUNCTION_DOCS)) {
			const originalContent = content
			content = addJSDocToFunction(content, functionName, description)
			if (content !== originalContent) {
				modified = true
			}
		}

		// Add JSDoc to types
		for (const [typeName, description] of Object.entries(TYPE_DOCS)) {
			const originalContent = content
			content = addJSDocToType(content, typeName, description)
			if (content !== originalContent) {
				modified = true
			}
		}

		if (modified) {
			writeFileSync(filePath, content)
			console.log(`✅ Updated: ${filePath}`)
		}
	}

	console.log('🎉 JSDoc comments added!')
}

// Execute
if (import.meta.main) {
	addJSDocToFiles().catch(console.error)
}
