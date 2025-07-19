/**
 * Jupiter Perpetuals Client Example
 *
 * This example shows how to fetch pool data from Jupiter Perpetuals
 * using the generated TypeScript client.
 */

import { type Address, createSolanaRpc } from '@solana/kit'
import { fetchCustody, fetchPool, PERPETUALS_PROGRAM_ADDRESS } from './src'

// Program address from IDL
const JUPITER_PERPS_PROGRAM =
	'PERPHjGBqRHArX4DySjwM6UJHiR3sWAatqfdBS2qQJu' as Address

// Known Jupiter Perps pool addresses
const KNOWN_ADDRESSES = {
	// Jupiter Labs Perpetuals Markets
	jupiterMarkets: '5BUwFW4nRbftYTDMbgxykoFWqWHPzahFSNAaaaJtVKsq' as Address,
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

		// 3. Fetch custody data for each custody in the pool
		console.log('\n📋 Custody Details:')
		for (let i = 0; i < poolData.data.custodies.length; i++) {
			const custodyAddress = poolData.data.custodies[i]
			if (!custodyAddress) {
				console.log(`   ${i + 1}. ⚠️  Empty custody address at index ${i}`)
				continue
			}
			try {
				const custodyData = await fetchCustody(rpc, custodyAddress)
				console.log(`   ${i + 1}. Address: ${custodyAddress}`)
				console.log(`      🪙 Token Mint: ${custodyData.data.mint}`)
				console.log(
					`      💰 Assets Owned: ${custodyData.data.assets.owned.toString()}`,
				)
				console.log(
					`      🔒 Assets Locked: ${custodyData.data.assets.locked.toString()}`,
				)
				console.log(`      📊 Decimals: ${custodyData.data.decimals}`)
				console.log(
					`      🎯 Target Ratio: ${custodyData.data.targetRatioBps} bps`,
				)
				console.log('')
			} catch (custodyError) {
				console.log(`   ${i + 1}. Address: ${custodyAddress}`)
				console.log(`      ⚠️  Failed to fetch custody data: ${custodyError}`)
				console.log('')
			}
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
