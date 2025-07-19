# Jupiter Perpetuals Client

[![NPM Version](https://img.shields.io/npm/v/jup-perps-client.svg)](https://www.npmjs.com/package/jup-perps-client)
[![NPM Downloads](https://img.shields.io/npm/dm/jup-perps-client.svg)](https://www.npmjs.com/package/jup-perps-client)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/jup-perps-client)](https://bundlephobia.com/package/jup-perps-client)
[![Node Version](https://img.shields.io/node/v/jup-perps-client.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Solana](https://img.shields.io/badge/Solana-Ready-green.svg)](https://solana.com/)
[![DeFi](https://img.shields.io/badge/DeFi-Trading-purple.svg)](https://dev.jup.ag/docs/perp-api/)
[![License](https://img.shields.io/npm/l/jup-perps-client.svg)](https://github.com/monakki/jup-perps-client/blob/master/LICENSE)

A TypeScript client for Jupiter Perpetuals Protocol, auto-generated from IDL using Codama.

## 🚀 Installation

```bash
npm install jup-perps-client
# or
yarn add jup-perps-client  
# or
pnpm add jup-perps-client
# or
bun add jup-perps-client
```

## 📦 Dependencies

The client uses `@solana/kit` for Solana interaction:

```bash
npm install @solana/kit
# or
yarn add @solana/kit
# or  
pnpm add @solana/kit
# or
bun add @solana/kit
```

### Environment Variables

You can configure the RPC endpoint using environment variables:

```bash
# Optional: Set custom RPC endpoint
export SOLANA_RPC_URL="https://your-custom-rpc-endpoint.com"

# Or use in your .env file
SOLANA_RPC_URL=https://your-custom-rpc-endpoint.com
```

## 🔧 Usage

### Basic Example

```typescript
import { createSolanaRpc, type Address } from '@solana/kit'
import { 
  fetchPool,
  fetchCustody,
  PERPETUALS_PROGRAM_ADDRESS
} from 'jup-perps-client'

// Create RPC connection
const rpc = createSolanaRpc(
  process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com'
)

// Jupiter Labs Perpetuals Markets
const poolAddress = '5BUwFW4nRbftYTDMbgxykoFWqWHPzahFSNAaaaJtVKsq' as Address
const pool = await fetchPool(rpc, poolAddress)

console.log('📛 Pool Name:', pool.data.name)
console.log('🏦 Number of Custodies:', pool.data.custodies.length)
console.log(`💰 AUM USD: $${(Number(pool.data.aumUsd) / 1_000_000).toLocaleString()}`)

// Fetch custody details
for (let i = 0; i < pool.data.custodies.length; i++) {
  const custodyAddress = pool.data.custodies[i]
  if (!custodyAddress) continue
  
  const custody = await fetchCustody(rpc, custodyAddress)
  console.log(`\n🪙 Custody ${i + 1}:`)
  console.log(`   Token Mint: ${custody.data.mint}`)
  console.log(`   Assets Owned: ${custody.data.assets.owned.toString()}`)
  console.log(`   Decimals: ${custody.data.decimals}`)
  console.log(`   Target Ratio: ${custody.data.targetRatioBps} bps`)
}
```

**Example Output:**
```
📛 Pool Name: Pool
🏦 Number of Custodies: 5
💰 AUM USD: $1,553,760,440.14

🪙 Custody 1:
   Token Mint: So11111111111111111111111111111111111111112
   Assets Owned: 4376906755684259
   Decimals: 9
   Target Ratio: 4700 bps

🪙 Custody 2:
   Token Mint: 7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs
   Assets Owned: 3764241196893
   Decimals: 8
   Target Ratio: 800 bps
```

### Protocol Data

```typescript
import { 
  fetchPerpetuals,
  identifyPerpetualsAccount,
  PerpetualsAccount 
} from 'jup-perps-client'

// Fetch main protocol account
const perpetualsAddress = 'H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG' as Address
const perpetuals = await fetchPerpetuals(rpc, perpetualsAddress)

console.log('Admin:', perpetuals.data.admin)
console.log('Pools:', perpetuals.data.pools.length)
console.log('Inception Time:', perpetuals.data.inceptionTime)
```

### Account Type Identification

```typescript
import { 
  identifyPerpetualsAccount,
  PerpetualsAccount 
} from 'jup-perps-client'

// Get account data
const accountInfo = await rpc.getAccountInfo(someAddress).send()

if (accountInfo.value) {
  try {
    const accountType = identifyPerpetualsAccount(accountInfo.value.data)
    
    switch (accountType) {
      case PerpetualsAccount.Pool:
        console.log('This is a liquidity pool')
        const pool = await fetchPool(rpc, someAddress)
        break
        
      case PerpetualsAccount.Position:
        console.log('This is a trader position')
        const position = await fetchPosition(rpc, someAddress)
        break
        
      case PerpetualsAccount.Custody:
        console.log('This is a token custody')
        const custody = await fetchCustody(rpc, someAddress)
        break
        
      default:
        console.log('Unknown account type')
    }
  } catch (error) {
    console.log('Account is not related to Jupiter Perps')
  }
}
```

### Working with Positions

```typescript
import { fetchPosition, fetchCustody } from 'jup-perps-client'

const positionAddress = 'YOUR_POSITION_ADDRESS' as Address
const position = await fetchPosition(rpc, positionAddress)

console.log('Position Owner:', position.data.owner)
console.log('Position Size:', position.data.sizeUsd.toString())
console.log('Entry Price:', position.data.priceUsd.toString())
```

### Error Handling Example

```typescript
import { fetchPool } from 'jup-perps-client'

async function getPoolInfo(poolAddress: Address) {
  try {
    const pool = await fetchPool(rpc, poolAddress)
    
    return {
      name: pool.data.name,
      aum: pool.data.aumUsd.toString(),
      custodies: pool.data.custodies.length,
      fees: pool.data.fees,
      inception: new Date(Number(pool.data.inceptionTime) * 1000)
    }
  } catch (error) {
    console.error('Failed to fetch pool:', error)
    throw error
  }
}

// Usage
const poolInfo = await getPoolInfo(poolAddress)
console.log('Pool Info:', poolInfo)
```

## 📚 API Reference

### Account Functions

#### Main Functions
- `fetchPerpetuals(rpc, address)` - Get main protocol data
- `fetchPool(rpc, address)` - Get liquidity pool data  
- `fetchPosition(rpc, address)` - Get position data
- `fetchCustody(rpc, address)` - Get token custody data
- `fetchTokenLedger(rpc, address)` - Get token ledger data
- `fetchPositionRequest(rpc, address)` - Get position request data

#### Batch Functions
- `fetchAllPerpetuals(rpc, addresses)` - Fetch multiple protocol accounts
- `fetchAllPool(rpc, addresses)` - Fetch multiple pools
- `fetchAllPosition(rpc, addresses)` - Fetch multiple positions

#### Safe Functions (Maybe variants)
- `fetchMaybePerpetuals(rpc, address)` - Safe protocol data fetch
- `fetchMaybePool(rpc, address)` - Safe pool data fetch
- `fetchMaybePosition(rpc, address)` - Safe position data fetch

### Utility Functions

#### Type Identification
- `identifyPerpetualsAccount(data)` - Identify Jupiter Perps account type
- `identifyPerpetualsInstruction(data)` - Identify instruction type

#### Enums
- `PerpetualsAccount` - Account types (Pool, Position, Custody, etc.)
- `PerpetualsInstruction` - Instruction types

### Constants

```typescript
import { PERPETUALS_PROGRAM_ADDRESS } from 'jup-perps-client'

console.log('Program Address:', PERPETUALS_PROGRAM_ADDRESS)
```

### TypeScript Types

All data types are automatically imported:

```typescript
import type { 
  Perpetuals,
  Pool, 
  Position,
  Custody,
  PositionRequest,
  TokenLedger,
  // ... and many more
} from 'jup-perps-client'
```

## 🛠️ Generated Client

This client is auto-generated from Jupiter Perpetuals IDL using [Codama](https://github.com/codama-idl/codama).

### Requirements

- Node.js ≥ 24.0.0
- npm ≥ 10.0.0

## 📄 License

MIT

## 🤝 Contributing

This client is auto-generated from Jupiter Perpetuals IDL files using Codama.
For issues or feature requests, please visit the [main repository](https://github.com/monakki/jup-perps-client).

## 🔗 Links

- [Jupiter Perpetuals API Documentation](https://dev.jup.ag/docs/perp-api/)
- [Codama IDL Framework](https://github.com/codama-idl/codama)
- [Solana Kit](https://github.com/anza-xyz/kit)

## ⚠️ Important Notes

- This client is designed for reading data from Jupiter Perpetuals
- For creating transactions, use the appropriate instructions from `instructions/`
- Always verify account addresses are current and valid
- Use reliable RPC endpoints for production applications
- The generated code supports both JavaScript and TypeScript projects

## 💰 Support

If this client helps you build amazing Solana applications, consider supporting the project:

**Solana**: `uJHFSYDcCRH2c6VLXY1kWBqGFmBb7JbF7FN8bsGAFtx`

Your support helps maintain and improve this package for the community!

