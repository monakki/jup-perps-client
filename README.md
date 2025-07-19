# Jupiter Perpetuals Client Generator

[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-Ready-orange.svg)](https://bun.sh/)
[![Codama](https://img.shields.io/badge/Codama-Generator-green.svg)](https://github.com/codama-idl/codama)
[![License](https://img.shields.io/npm/l/jup-perps-client.svg)](https://github.com/monakki/jup-perps-client/blob/main/LICENSE.txt)

**Development repository** for generating TypeScript client for Jupiter Perpetuals Protocol from IDL using Codama.

> **📦 Looking to use the client?** Check out the [npm package](https://www.npmjs.com/package/jup-perps-client) or see [js-client/README.md](js-client/README.md) for usage instructions.

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
bun build:js    # Generate and build the JS client
```

## 🔧 Generate Client

### Quick Start

```bash
bun build:js    # Generate and build TypeScript client
bun example     # Test the generated client
```

### Generator Features

- **IDL Processing**: Converts Jupiter Perpetuals IDL to TypeScript using Codama
- **Program Address Injection**: Automatically sets correct program address
- **Type Generation**: Full TypeScript definitions for all accounts and instructions
- **JSDoc Enhancement**: Adds comprehensive documentation to generated code
- **Modular Output**: Organized structure with accounts/, instructions/, types/, programs/

### Generated Structure

```
js-client/
├── src/
│   ├── accounts/          # Account fetchers (fetchPool, fetchCustody, etc.)
│   ├── instructions/      # Instruction builders 
│   ├── types/            # TypeScript type definitions
│   ├── programs/         # Program constants and utilities
│   └── index.ts          # Main exports
├── dist/                 # Compiled JavaScript + TypeScript definitions
└── example.ts           # Usage example
```

## 📁 Project Structure

```
jupiter-perps-client/
├── generator/
│   ├── idl/
│   │   └── jupiter-perpetuals.json    # Source IDL file
│   └── js/
│       ├── generate.ts               # Main generator script
│       └── add-jsdoc.ts             # JSDoc enhancement
├── js-client/                       # Generated client package
│   ├── src/                        # Generated TypeScript source
│   ├── dist/                       # Compiled JavaScript + definitions
│   ├── example.ts                  # Usage example
│   ├── package.json                # Package configuration
│   └── README.md                   # Usage documentation
├── package.json                    # Development scripts
└── README.md                      # This file (development docs)
```

### Development Commands

```bash
# Generate TypeScript client from IDL
bun generate

# Compile TypeScript to JavaScript + add JSDoc
bun compile

# Full build process (generate + compile)
bun build:js

# Run example (test client functionality)
bun example

# Format code
bun format

# Lint code
bun lint

# Check code (format + lint)
bun check
```


### How It Works

1. **IDL Processing**: `generator/js/generate.ts` uses Codama to convert IDL to TypeScript
2. **Program Address Injection**: `updateProgramsVisitor` sets the correct program address
3. **JSDoc Enhancement**: `generator/js/add-jsdoc.ts` adds comprehensive documentation
4. **Building**: TypeScript compilation creates the final package in `js-client/dist/`

### Updating IDL

When Jupiter releases a new IDL version:

```bash
# 1. Replace the IDL file
cp new-jupiter-perpetuals.json generator/idl/jupiter-perpetuals.json

# 2. Regenerate the client
bun build:js

# 3. Test the changes
bun example

# 4. Update version and publish
cd js-client
npm version patch  # or minor/major
npm publish
```

### Making Changes to Generator

To modify the generation process:

1. Edit `generator/js/generate.ts` for core generation logic
2. Edit `generator/js/add-jsdoc.ts` for documentation improvements  
3. Run `bun build:js` to see changes
4. Test with `bun example`

### Requirements

- Node.js ≥ 24.0.0
- Bun (recommended) or npm ≥ 10.0.0
- TypeScript for development

## 📄 License

MIT

## 🤝 Contributing

This client is auto-generated from Jupiter Perpetuals IDL files using Codama.

To make changes:
1. Update IDL files in `generator/idl/` folder
2. Rebuild package with `bun build:js`

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

