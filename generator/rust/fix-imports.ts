import { readdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'

const RUST_CLIENT_SRC = path.join(process.cwd(), 'jup-perps-client-rust/src')

// Import mappings that need to be fixed
const IMPORT_FIXES = [
	// Fix Solana type imports
	{ from: /solana_pubkey::/g, to: 'solana_program::pubkey::' },
	// Keep solana_account::Account as is - it's correct with solana-account dependency
	{ from: /solana_account_info::/g, to: 'solana_program::account_info::' },
	{ from: /solana_instruction::/g, to: 'solana_program::instruction::' },
	{ from: /solana_program_entrypoint::/g, to: 'solana_program::entrypoint::' },
	{ from: /solana_cpi::/g, to: 'solana_program::program::' },

	// Fix other problematic imports
	{ from: /solana_program_error::/g, to: 'solana_program::program_error::' },
	{ from: /solana_decode_error::/g, to: 'solana_program::decode_error::' },

	// Fix deprecated traits - remove entire impl blocks (multiline aware)
	{
		from: /impl solana_program::program_error::PrintProgramError for (\w+) \{[\s\S]*?\n\}\s*/g,
		to: '// PrintProgramError trait is deprecated - removed implementation for $1\n',
	},
	{
		from: /impl<T> solana_program::decode_error::DecodeError<T> for (\w+) \{[\s\S]*?\n\}\s*/g,
		to: '// DecodeError trait is deprecated - removed implementation for $1\n',
	},

	// Fix generated module imports (remove 'generated::' prefix)
	{ from: /crate::generated::/g, to: 'crate::' },

	// Fix pubkey macro import (macro is at crate root, not in pubkey module)
	{
		from: /use solana_program::pubkey::\{pubkey, Pubkey\};/g,
		to: 'use solana_program::{pubkey, pubkey::Pubkey};',
	},

	// Fix pubkey macro usage in code
	{ from: /solana_program::pubkey::pubkey!/g, to: 'solana_program::pubkey!' },

	// Fix empty pubkey in programs.rs
	{
		from: /pubkey!\(""\)/g,
		to: 'pubkey!("PERPHjGBqRHArX4DySjwM6UJHiR3sWAatqfdBS2qQJu")',
	},

	// Fix solana_msg import
	{ from: /solana_msg::msg!/g, to: 'solana_program::msg!' },

	// Fix duplicate instruction function names
	{
		from: /pub fn instruction\(&mut self, instruction: solana_program::pubkey::Pubkey\) -> &mut Self \{/g,
		to: 'pub fn set_instruction(&mut self, instruction: solana_program::pubkey::Pubkey) -> &mut Self {',
	},

	// Fix f32 Eq trait issue - remove Eq from derives when struct contains f32
	{
		from: /#\[derive\(BorshSerialize, BorshDeserialize, Clone, Debug, Eq, PartialEq\)\]/g,
		to: '#[derive(BorshSerialize, BorshDeserialize, Clone, Debug, PartialEq)]',
	},
]

const shouldAddUseStatements = (content: string): boolean => {
	// Only add use statements to instruction files
	return (
		content.includes('pub fn instruction(') ||
		content.includes('pub fn invoke(') ||
		content.includes('CPI') ||
		content.includes('AccountMeta') ||
		content.includes('Instruction')
	)
}

const addMinimalUseStatements = (content: string): string => {
	if (!shouldAddUseStatements(content)) {
		return content
	}

	// Check if we already have solana_program imports
	if (content.includes('use solana_program::')) {
		return content
	}

	// Add minimal imports only if the borsh imports exist
	if (
		content.includes('use borsh::BorshSerialize') &&
		content.includes('use borsh::BorshDeserialize')
	) {
		return content.replace(
			/^use borsh::BorshSerialize;\nuse borsh::BorshDeserialize;/m,
			`use borsh::{BorshSerialize, BorshDeserialize};`,
		)
	}

	return content
}

const removeDuplicateImports = (content: string): string => {
	// Remove duplicate Pubkey imports from use solana_program statements
	if (
		content.includes('use solana_program::{') &&
		content.includes('use solana_program')
	) {
		// Find existing use solana_program that have Pubkey and remove the standalone ones
		const lines = content.split('\n')
		const filteredLines: string[] = []
		let hasGroupedImport = false

		for (const line of lines) {
			if (
				line.includes('use solana_program::{') &&
				line.includes('pubkey::Pubkey')
			) {
				hasGroupedImport = true
				filteredLines.push(line)
			} else if (line.trim() === 'pubkey::Pubkey,' && hasGroupedImport) {
			} else {
				filteredLines.push(line)
			}
		}

		return filteredLines.join('\n')
	}

	return content
}

const fixImportsInFile = async (filePath: string) => {
	try {
		let content = await readFile(filePath, 'utf-8')
		let modified = false

		for (const fix of IMPORT_FIXES) {
			if (fix.from.test(content)) {
				content = content.replace(fix.from, fix.to)
				modified = true
			}
		}

		// Apply minimal use statements and remove duplicates
		const newContent = removeDuplicateImports(addMinimalUseStatements(content))
		if (newContent !== content) {
			content = newContent
			modified = true
		}

		if (modified) {
			await writeFile(filePath, content)
			console.log(
				`✅ Fixed imports in: ${path.relative(process.cwd(), filePath)}`,
			)
		}
	} catch (error) {
		console.error(`❌ Error fixing ${filePath}:`, error)
	}
}

const processDirectory = async (dirPath: string) => {
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
				await fixImportsInFile(fullPath)
			}
		}
	} catch (error) {
		console.error(`❌ Error processing directory ${dirPath}:`, error)
	}
}

const fixImports = async () => {
	console.log('🔧 Fixing Solana imports in generated Rust code...')
	await processDirectory(RUST_CLIENT_SRC)
	console.log('✅ Import fixing completed!')
}

// Run if this script is executed directly
if (import.meta.main) {
	fixImports()
}

export { fixImports }
