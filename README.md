# Jupiter Perpetuals Multi-Language Client Generator

[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Rust](https://img.shields.io/badge/Rust-Ready-red.svg)](https://www.rust-lang.org/)
[![Bun](https://img.shields.io/badge/Bun-Ready-orange.svg)](https://bun.sh/)
[![Codama](https://img.shields.io/badge/Codama-Generator-green.svg)](https://github.com/codama-idl/codama)
[![License](https://img.shields.io/npm/l/jup-perps-client.svg)](https://github.com/monakki/jup-perps-client/blob/main/LICENSE.txt)

**Development repository** for generating **TypeScript** and **Rust** clients for Jupiter Perpetuals Protocol from IDL using Codama.

> **📦 Looking to use the clients?** 
> - **TypeScript/JavaScript**: [npm package](https://www.npmjs.com/package/jup-perps-client) or see [jup-perps-client-js/README.md](jup-perps-client-js/README.md)
> - **Rust**: Add `jup-perps-client-rust` as dependency in your Cargo.toml

## 🛠️ Development Setup

### Prerequisites

- [Bun](https://bun.sh/) runtime (recommended)
- Node.js ≥ 24.0.0 (alternative)
- Git

### Clone and Setup

> **Note:** This repository does not include generated files. You must run the generator to create the client.

```bash
git clone https://github.com/monakki/jup-perps-client.git
cd jup-perps-client
bun install
```

## 🔧 Generate Clients

### Quick Start

```bash
# Build specific clients
bun run build:js     # Build TypeScript client
bun run build:rust   # Build Rust client  

# Test clients
bun run example:js   # Test TypeScript client
bun run example:rust # Test Rust client
```

### Generator Features

- **Multi-Language Support**: Generates both TypeScript and Rust clients from single IDL
- **IDL Processing**: Converts Jupiter Perpetuals IDL using Codama framework
- **Program Address Injection**: Automatically sets correct program address
- **Type Generation**: Full type definitions for all accounts and instructions in both languages
- **Documentation**: JSDoc for TypeScript, Rustdoc for Rust
- **RPC Integration**: Built-in Solana RPC client support (works out of the box)
- **Environment Variables**: Configurable RPC URLs via environment variables
- **Parallel Generation**: Fast multi-language builds

### Generated Structure

```
# TypeScript Client
jup-perps-client-js/
├── src/
│   ├── accounts/          # Account fetchers (fetchPool, fetchCustody, etc.)
│   ├── instructions/      # Instruction builders 
│   ├── types/            # TypeScript type definitions
│   ├── programs/         # Program constants and utilities
│   └── index.ts          # Main exports
├── dist/                 # Compiled JavaScript + TypeScript definitions
└── examples/             # Usage examples

# Rust Client  
jup-perps-client-rust/
├── src/
│   ├── accounts/         # Account fetchers (fetch_pool, fetch_custody, etc.)
│   ├── instructions/     # Instruction builders
│   ├── types/           # Rust type definitions
│   ├── programs/        # Program constants
│   └── lib.rs           # Main library
├── examples/            # Usage examples
└── Cargo.toml          # Rust package configuration
```

## 📁 Project Structure

```
jupiter-perps-client/
├── generator/
│   ├── idl/
│   │   └── jupiter-perpetuals.json    # Source IDL file
│   ├── js/
│   │   ├── generate.ts               # TypeScript generator
│   │   └── add-jsdoc.ts             # JSDoc enhancement
│   ├── rust/
│   │   ├── generate.ts               # Rust generator  
│   │   ├── add-rust-docs.ts         # Rustdoc enhancement
│   │   └── fix-imports.ts           # Solana compatibility fixes
│   └── generate-all.ts              # Multi-language generator
├── jup-perps-client-js/            # Generated TypeScript client
│   ├── src/                        # Generated TypeScript source
│   ├── dist/                       # Compiled JavaScript + definitions
│   ├── examples/                   # Usage examples
│   └── package.json                # NPM package
├── jup-perps-client-rust/          # Generated Rust client
│   ├── src/                        # Generated Rust source
│   ├── examples/                   # Usage examples
│   └── Cargo.toml                  # Cargo package
├── package.json                    # Development scripts
└── README.md                      # This file
```

### Development Commands

```bash
# Generate clients from IDL
bun run generate        # Generate both clients
bun run generate:js     # Generate TypeScript client only
bun run generate:rust   # Generate Rust client only

# Compile generated code
bun run compile:js      # Compile TypeScript + add JSDoc
bun run compile:rust    # Compile Rust (cargo build)

# Full build (generate + compile)
bun run build:js        # Generate + compile TypeScript
bun run build:rust      # Generate + compile Rust

# Test clients
bun run example:js      # Test TypeScript client
bun run example:rust    # Test Rust client

# Code quality
bun run format          # Format TypeScript code
bun run lint            # Lint TypeScript code
bun run check           # Format + lint TypeScript

# Publishing
bun run publish:js      # Publish TypeScript to npm
bun run publish:rust    # Publish Rust to crates.io
```


### How It Works

1. **IDL Processing**: Codama converts Jupiter Perpetuals IDL to both TypeScript and Rust
2. **Program Address Injection**: `updateProgramsVisitor` sets correct program address for both languages
3. **Language-Specific Processing**:
   - **TypeScript**: JSDoc enhancement, TypeScript compilation
   - **Rust**: Import fixing, deprecated trait removal, Rustdoc enhancement
4. **Documentation**: Both clients get comprehensive documentation (JSDoc/Rustdoc)
5. **RPC Integration**: Both clients include fetch functionality with environment variable support

### Updating IDL

When Jupiter releases a new IDL version:

```bash
# 1. Replace the IDL file
cp new-jupiter-perpetuals.json generator/idl/jupiter-perpetuals.json

# 2. Regenerate both clients
bun run generate

# 3. Test the changes
bun run example:js
bun run example:rust

# 4. Update versions and publish
bun run publish:js    # Update and publish TypeScript
bun run publish:rust  # Update and publish Rust
```

### Making Changes to Generator

To modify the generation process:

**For TypeScript client:**
1. Edit `generator/js/generate.ts` for core generation logic
2. Edit `generator/js/add-jsdoc.ts` for documentation improvements

**For Rust client:**
1. Edit `generator/rust/generate.ts` for core generation logic
2. Edit `generator/rust/add-rust-docs.ts` for documentation
3. Edit `generator/rust/fix-imports.ts` for Solana compatibility

**Testing changes:**
```bash
bun run generate     # Regenerate both clients
bun run example:js   # Test TypeScript
bun run example:rust # Test Rust
```

### Requirements

**Development:**
- Node.js ≥ 24.0.0
- Bun (recommended) or npm ≥ 10.0.0
- TypeScript for development

**Rust Development (optional):**
- Rust ≥ 1.75.0
- Cargo

## 📄 License

MIT

## 🤝 Contributing

These clients are auto-generated from Jupiter Perpetuals IDL files using Codama.

To make changes:
1. Update IDL files in `generator/idl/` folder
2. Rebuild packages with `bun run generate`
3. Test both clients with `bun run example:js` and `bun run example:rust`

## 🔗 Links

- [Jupiter Perpetuals API Documentation](https://dev.jup.ag/docs/perp-api/)
- [Codama IDL Framework](https://github.com/codama-idl/codama)
- [Solana Kit](https://github.com/anza-xyz/kit)

## ⚠️ Important Notes

- These clients are designed for reading data from Jupiter Perpetuals
- For creating transactions, use the appropriate instructions from `instructions/`
- Always verify account addresses are current and valid
- Use reliable RPC endpoints for production applications
- **TypeScript**: Supports both JavaScript and TypeScript projects
- **Rust**: RPC features enabled by default (`fetch` feature)
- **Environment Variables**: Both clients support `SOLANA_RPC_URL` configuration

## 💰 Support

If this client helps you build amazing Solana applications, consider supporting the project:

**Solana**: `uJHFSYDcCRH2c6VLXY1kWBqGFmBb7JbF7FN8bsGAFtx`

Your support helps maintain and improve this package for the community!

