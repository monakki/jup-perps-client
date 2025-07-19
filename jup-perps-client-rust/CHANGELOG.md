# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial release of Jupiter Perpetuals Rust client
- Support for all account types: Pool, Position, Custody, Perpetuals, TokenLedger, PositionRequest
- Auto-generated client from IDL using Codama framework
- Full Rust type definitions with Rustdoc comments
- Comprehensive README with usage examples
- Support for solana-client RPC integration
- Automatic Rustdoc comment generation for better IDE experience
- Environment variable support (`SOLANA_RPC_URL`) for custom RPC endpoints
- Built-in Solana dependency compatibility fixes

### Features
- `fetch_pool()` - Get pool liquidity data
- `fetch_perpetuals()` - Get main protocol account data
- `fetch_position()` - Get trader position data
- `fetch_custody()` - Get token custody data
- `fetch_token_ledger()` - Get token ledger data
- `fetch_position_request()` - Get position request data
- Batch operations: `fetch_all_pool()`, `fetch_all_perpetuals()`, etc.
- Safe operations: `fetch_maybe_pool()`, `fetch_maybe_perpetuals()`, etc.
- `from_bytes()` - Deserialize account data from raw bytes

### Technical Details
- Generated from Jupiter Perpetuals IDL using Codama
- Uses solana-client for Solana RPC interaction
- Built with Rust ecosystem best practices
- Full Rust type safety with comprehensive traits
- Automatic Rustdoc generation for all public APIs
- Feature-gated compilation (`fetch` feature enabled by default)
- Borsh serialization support with optional Serde
- Comprehensive error handling with Rust Result types

### Feature Flags
- `fetch` (default) - Enables RPC client functions and dependencies
- `serde` - Enables JSON serialization/deserialization support
- `anchor` - Additional Anchor-specific functionality
- `anchor-idl-build` - IDL build support

### Dependencies
- `borsh` - Binary serialization
- `solana-program` - Core Solana types
- `solana-client` - RPC client (when `fetch` feature enabled)
- `solana-account` - Account types (when `fetch` feature enabled)
- `serde` - JSON serialization (when `serde` feature enabled)