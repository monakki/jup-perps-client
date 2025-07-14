# Jupiter Perpetuals Client

[![NPM Version](https://img.shields.io/npm/v/jup-perps-client.svg)](https://www.npmjs.com/package/jup-perps-client)
[![NPM Downloads](https://img.shields.io/npm/dm/jup-perps-client.svg)](https://www.npmjs.com/package/jup-perps-client)
[![License](https://img.shields.io/npm/l/jup-perps-client.svg)](https://github.com/monakki/jup-perps-client/blob/master/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-Ready-orange.svg)](https://bun.sh/)

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

## 🔧 Usage

### Basic Example

```typescript
import { createSolanaRpc, type Address } from '@solana/kit'
import { 
  fetchPool,
  fetchPerpetuals,
  fetchPosition,
  fetchCustody
} from 'jup-perps-client'

// Create RPC connection
const rpc = createSolanaRpc('https://api.mainnet-beta.solana.com')

// Fetch pool data
const poolAddress = '5BUwFW4nRbftYTDMbgxykoFWqWHPzahFSNAaaaJtVKsq' as Address
const pool = await fetchPool(rpc, poolAddress)

console.log('Pool Name:', pool.data.name)
console.log('AUM:', pool.data.aumUsd.toString())
console.log('Custodies:', pool.data.custodies.length)
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
// Note: May be empty in current version
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

## 🛠️ Development

### Build from Source

> **Note:** This repository does not include the built files (`dist/`) or generated code (`src/generated/`).
> After cloning, you must generate the client and build the package before use.

```bash
git clone https://github.com/yourmonakki/jup-perps-client.git
cd jup-perps-client
bun install
bun run generate    # Generates TypeScript client from IDL into src/generated/
bun run build       # Builds the package into dist/
```

### Development Scripts

```bash
# Generate TypeScript client from IDL
bun run generate

# Build production package
bun run build

# Run example (test client functionality)
bun run example

# Development mode with hot reload
bun run dev
```

### Project Structure

```
├── src/
│   ├── index.ts           # Main entry point
│   └── generated/         # Auto-generated client code (ignored in git)
├── idl/
│   └── jupiter-perpetuals.json  # Jupiter Perpetuals IDL
├── generate-client.ts     # Codama client generation script
├── add-jsdoc.ts          # JSDoc automation script
└── example.ts            # Usage example
```

### How It Works

1. **IDL Processing**: `generate-client.ts` uses Codama to convert IDL to TypeScript
2. **JSDoc Enhancement**: `add-jsdoc.ts` adds comprehensive documentation
3. **Building**: TypeScript compilation creates the final package in `dist/`

### Updating the Client

```bash
# When Jupiter updates their IDL:
# 1. Replace idl/jupiter-perpetuals.json with new IDL
# 2. Regenerate client
bun run generate
bun run build

# The client will automatically update to support new features
```

### Requirements

- Node.js ≥ 20.0.0
- Bun (recommended) or npm ≥ 10.0.0
- TypeScript for development

## 📄 License

MIT

## 🤝 Contributing

This client is auto-generated from Jupiter Perpetuals IDL files using Codama.

To make changes:
1. Update IDL files in `idl/` folder
2. Run `bun run generate`
3. Rebuild package with `bun run build`

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

