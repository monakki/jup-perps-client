/**
 * Jupiter Perpetuals Client Example
 *
 * This example shows how to fetch pool data from Jupiter Perpetuals
 * using the generated TypeScript client.
 */

import { type Address, createSolanaRpc } from '@solana/kit'
import {
	fetchBorrowPosition,
	fetchCustody,
	fetchPool,
	PERPETUALS_PROGRAM_ADDRESS,
} from './src'

// Program address from IDL
const JUPITER_PERPS_PROGRAM =
	'PERPHjGBqRHArX4DySjwM6UJHiR3sWAatqfdBS2qQJu' as Address

// Known Jupiter Perps pool addresses
const KNOWN_ADDRESSES = {
	// Jupiter Labs Perpetuals Markets
	jupiterMarkets: '5BUwFW4nRbftYTDMbgxykoFWqWHPzahFSNAaaaJtVKsq' as Address,
	usdcCustody: 'G18jKKXQwBbrHeiK3C9MRXhkHsLHf7XgCSisykV46EZa' as Address,
	sampleBorrowPosition:
		'84hK5omtZ1hGG4BxbbJUHSToapXn6yLbeZFU7bw1AnR5' as Address,
}

// Example of fetching and parsing Jupiter Perps data
const runExample = async () => {
	console.log('🚀 Jupiter Perps Client - Data Parsing\n')

	// 1. Connect to Solana
	const rpcUrl =
		process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com'
	const rpc = createSolanaRpc(rpcUrl)

	console.log(`📍 Jupiter Perps Program: ${JUPITER_PERPS_PROGRAM}`)
	console.log(`📍 Generated constant: "${PERPETUALS_PROGRAM_ADDRESS}"\n`)

	// 2. Fetch pool data
	console.log('📊 Fetching Jupiter Labs Perpetuals Markets data...')

	try {
		console.log('\n🏊 Jupiter Labs Perpetuals Markets...')
		const poolData = await fetchPool(rpc, KNOWN_ADDRESSES.jupiterMarkets)
		console.log('✅ Pool data fetched:')
		console.log(`   📛 Pool Name: ${poolData.data.name}`)
		console.log(`   🏦 Number of Custodies: ${poolData.data.custodies.length}`)
		console.log(
			`   💰 AUM USD: $${(Number(poolData.data.aumUsd) / 1_000_000).toLocaleString()}`,
		)

		// 3. Borrow/Lending data from USDC Custody (new fields in v1.2.0)
		console.log(
			'\n🏦 Borrow/Lending Data - USDC Custody (new fields in v1.2.0):',
		)
		try {
			const custodyData = await fetchCustody(rpc, KNOWN_ADDRESSES.usdcCustody)
			const c = custodyData.data
			console.log(`   📍 Custody: ${KNOWN_ADDRESSES.usdcCustody}`)
			console.log(`   🪙 Mint: ${c.mint}`)
			console.log(`   💸 Total Debt: ${c.debt.toString()}`)
			console.log(
				`   📈 Borrow Interests Accrued: ${c.borrowLendInterestsAccured.toString()}`,
			)
			console.log(
				`   🔒 Borrow Limit (tokens): ${c.borrowLimitInTokenAmount.toString()}`,
			)
			console.log(
				`   📊 Borrows Limit: ${c.borrowLendParameters.borrowsLimitInBps} bps`,
			)
			console.log(
				`   🛡️  Maintenance Margin: ${c.borrowLendParameters.maintainanceMarginBps} bps`,
			)
			console.log(`   💰 Min Interest Fee: ${c.minInterestFeeBps} bps`)
			console.log(
				`   📅 Borrows Rate Last Update: ${new Date(Number(c.borrowsFundingRateState.lastUpdate) * 1000).toISOString()}`,
			)
			console.log(
				`   📈 Borrows Cumulative Rate: ${c.borrowsFundingRateState.cumulativeInterestRate.toString()}`,
			)
		} catch (e) {
			console.log(`   ⚠️  Failed: ${e instanceof Error ? e.message : e}`)
		}

		// 4. BorrowPosition account (new in v1.2.0)
		console.log('\n📄 BorrowPosition Account (new in v1.2.0):')
		try {
			const bp = await fetchBorrowPosition(
				rpc,
				KNOWN_ADDRESSES.sampleBorrowPosition,
			)
			console.log(`   📍 Address: ${KNOWN_ADDRESSES.sampleBorrowPosition}`)
			console.log(`   👤 Owner: ${bp.data.owner}`)
			console.log(`   🏦 Custody: ${bp.data.custody}`)
			console.log(`   💸 Borrow Size: ${bp.data.borrowSize.toString()}`)
			console.log(
				`   🔒 Locked Collateral: ${bp.data.lockedCollateral.toString()}`,
			)
			console.log(
				`   🕐 Open Time: ${new Date(Number(bp.data.openTime) * 1000).toISOString()}`,
			)
			console.log(
				`   🔄 Last Borrowed: ${new Date(Number(bp.data.lastBorrowed) * 1000).toISOString()}`,
			)
		} catch (e) {
			console.log(`   ⚠️  Failed: ${e instanceof Error ? e.message : e}`)
		}
	} catch (error) {
		console.log(
			'⚠️  Failed to fetch pool data:',
			error instanceof Error ? error.message : 'Unknown error',
		)
	}

	console.log('\n✅ Example completed!')
	console.log('💡 Client successfully parses Jupiter Perps data!')
}

// Run example (compatible with both Node.js and Bun)
if (typeof require !== 'undefined' && require.main === module) {
	runExample().catch(console.error)
} else if (typeof import.meta !== 'undefined' && import.meta.main) {
	runExample().catch(console.error)
}
