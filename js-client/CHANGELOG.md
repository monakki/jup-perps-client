# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-07-19

### Added
- Enhanced example with comprehensive Jupiter Labs Perpetuals Markets demonstration
- Added support for environment variables (`SOLANA_RPC_URL`) for custom RPC endpoints
- Cross-platform compatibility for Node.js and Bun runtimes
- Comprehensive custody data display in examples
- Better error handling for edge cases

### Changed
- Updated example to showcase Jupiter Labs Perpetuals Markets pool (`5BUwFW4nRbftYTDMbgxykoFWqWHPzahFSNAaaaJtVKsq`)
- Enhanced README with practical usage examples and real output data
- Improved documentation structure and clarity

### Fixed
- **PERPETUALS_PROGRAM_ADDRESS** constant now properly contains the actual program address instead of empty string
- TypeScript compatibility issues with optional address handling
- Cross-runtime execution compatibility

### Package Improvements
- Complete TypeScript definitions for all modules
- Modular exports structure (accounts/, instructions/, types/, programs/)
- Enhanced type safety with proper address typing
- Better organized dist structure with full compilation coverage

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