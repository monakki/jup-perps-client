# Changelog - Development

All notable changes to the **development repository** and generator will be documented in this file.

For npm package releases, see [js-client/CHANGELOG.md](js-client/CHANGELOG.md).

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - 2025-07-19

### Added - Multi-Language Support
- **Rust Client Generator**: Full Rust client generation alongside TypeScript
- **Dual-language architecture**: Both TypeScript and Rust clients from single IDL
- **Rust Documentation**: Comprehensive Rustdoc comments generation (`generator/rust/add-rust-docs.ts`)
- **Rust Import Fixing**: Solana compatibility fixes (`generator/rust/fix-imports.ts`)
- **Parallel Generation**: Optimized multi-language build pipeline
- **Environment Variables**: `SOLANA_RPC_URL` support for both clients
- **Feature-gated Rust**: `fetch` feature enabled by default for better UX

### Added - Development Improvements
- Separated development repository structure from npm package
- Created dedicated generator in `generator/` directory with IDL and scripts
- Added `updateProgramsVisitor` to properly inject program addresses from IDL
- Enhanced JSDoc generation with improved `generator/js/add-jsdoc.ts`
- Cross-platform compatibility for examples (Node.js and Bun support)
- Comprehensive development documentation in root README
- Separated README structure: root for development, clients for usage

### Changed
- **Repository Structure**: Multi-language monorepo with `jup-perps-client-js/` and `jup-perps-client-rust/`
- **Build System**: Unified commands for both languages (`build:js`, `build:rust`, `example:js`, `example:rust`)
- **Generator Architecture**: Modular generators in `generator/js/` and `generator/rust/`
- **Package Names**: Descriptive directory names (`jup-perps-client-js`, `jup-perps-client-rust`)
- **Command Structure**: Added `compile:js`, `compile:rust` for granular control
- Enhanced generator to create complete modular dist structure
- Improved development workflow with proper script separation

### Fixed
- Empty `PERPETUALS_PROGRAM_ADDRESS` constant now properly injected during generation
- Generator now creates complete TypeScript definitions and compiled JavaScript
- Modular export structure in generated client (accounts/, instructions/, types/, programs/)
- Cross-runtime compatibility issues in examples
- TypeScript compatibility issues with custody address handling

### Technical Implementation
- **Multi-Language Pipeline**: Codama generates both TypeScript and Rust from single IDL
- **Rust Client Features**: 
  - Built-in RPC client support with `fetch` feature enabled by default
  - Comprehensive error handling and type safety
  - Environment variable configuration (`SOLANA_RPC_URL`)
  - Automatic Solana dependency compatibility
- **Documentation Systems**: JSDoc for TypeScript, Rustdoc for Rust
- **Program Address Injection**: `PERPHjGBqRHArX4DySjwM6UJHiR3sWAatqfdBS2qQJu`
- **Parallel Build System**: Optimized generation and compilation for both languages
- Created modular compilation structure with full TypeScript definitions
- Enhanced automation for better developer experience across languages

### Repository Structure
```
jupiter-perps-client/
├── generator/                    # Multi-language IDL generation
│   ├── idl/                     # Source IDL files
│   ├── js/                      # TypeScript generator (generate.ts, add-jsdoc.ts)
│   ├── rust/                    # Rust generator (generate.ts, add-rust-docs.ts, fix-imports.ts)
│   └── generate-all.ts          # Multi-language build coordinator
├── jup-perps-client-js/         # Generated TypeScript/JavaScript client
├── jup-perps-client-rust/       # Generated Rust client
├── CHANGELOG.md                 # Development changelog (this file)
└── README.md                    # Development documentation
```

## [1.0.0] - 2025-07-14

### Added
- Initial repository setup with basic Codama-based client generation
- First npm package release with basic functionality