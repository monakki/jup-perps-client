# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-07-14

### Added
- Initial release of Jupiter Perpetuals TypeScript client
- Support for all account types: Pool, Position, Custody, Perpetuals, TokenLedger, PositionRequest
- Auto-generated client from IDL using Codama framework
- Full TypeScript type definitions with JSDoc comments
- Comprehensive README with usage examples
- Support for @solana/kit RPC client
- Automatic JSDoc comment generation for better IDE experience
- Account type identification utilities
- Batch fetch operations for multiple accounts
- Safe fetch operations with Maybe variants

### Features
- `fetchPool()` - Get pool liquidity data
- `fetchPerpetuals()` - Get main protocol account data
- `fetchPosition()` - Get trader position data
- `fetchCustody()` - Get token custody data
- `fetchTokenLedger()` - Get token ledger data
- `fetchPositionRequest()` - Get position request data
- `identifyPerpetualsAccount()` - Identify account type
- `identifyPerpetualsInstruction()` - Identify instruction type
- Batch operations: `fetchAllPool()`, `fetchAllPerpetuals()`, etc.
- Safe operations: `fetchMaybePool()`, `fetchMaybePerpetuals()`, etc.

### Technical Details
- Generated from Jupiter Perpetuals IDL using Codama
- Uses @solana/kit for Solana interaction
- Built with Bun runtime
- Full TypeScript support with strict mode
- Automatic JSDoc generation for all public APIs
- Comprehensive error handling