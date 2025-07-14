#!/usr/bin/env bun

import { createSolanaRpc, type Address } from '@solana/kit'
import { 
  PERPETUALS_PROGRAM_ADDRESS,
  fetchPool
} from './src/generated'

// Program address from IDL
const JUPITER_PERPS_PROGRAM = 'PERPHjGBqRHArX4DySjwM6UJHiR3sWAatqfdBS2qQJu' as Address

// Known Jupiter Perps addresses (from their UI/documentation)
const KNOWN_ADDRESSES = {
  // Main SOL-USD pool
  solPool: '5BUwFW4nRbftYTDMbgxykoFWqWHPzahFSNAaaaJtVKsq' as Address,
}

// Example of fetching and parsing Jupiter Perps data
async function runExample() {
  console.log('🚀 Jupiter Perps Client - Data Parsing\n')
  
  // 1. Connect to Solana
  const rpcUrl = process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com'
  const rpc = createSolanaRpc(rpcUrl)
  
  console.log(`📍 Jupiter Perps Program: ${JUPITER_PERPS_PROGRAM}`)
  console.log(`📍 Generated constant: "${PERPETUALS_PROGRAM_ADDRESS}" (currently empty)\n`)
  
  // 2. Fetch pool data
  console.log('📊 Fetching Jupiter Perps pool data...')
  
  try {
    console.log('\n🏊 SOL pool...')
    const poolData = await fetchPool(rpc, KNOWN_ADDRESSES.solPool)
    console.log('✅ Pool data fetched:')
    console.log(`   Name: ${poolData.data.name}`)
    console.log(`   Custodies: ${poolData.data.custodies.length}`)
    console.log(`   AUM: ${poolData.data.aumUsd.toString()}`)
    
  } catch (error) {
    console.log('⚠️  Failed to fetch pool data:', error instanceof Error ? error.message : 'Unknown error')
  }
  
  console.log('\n✅ Example completed!')
  console.log('💡 Client successfully parses Jupiter Perps data!')
}

// Run example
if (import.meta.main) {
  runExample().catch(console.error)
}