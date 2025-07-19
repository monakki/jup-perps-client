# Changelog - Development

All notable changes to the **development repository** and generator will be documented in this file.

For npm package releases, see [js-client/CHANGELOG.md](js-client/CHANGELOG.md).

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - 2025-07-19

### Added
- Separated development repository structure from npm package
- Created dedicated generator in `generator/` directory with IDL and scripts
- Added `updateProgramsVisitor` to properly inject program addresses from IDL
- Enhanced JSDoc generation with improved `generator/js/add-jsdoc.ts`
- Cross-platform compatibility for examples (Node.js and Bun support)
- Comprehensive development documentation in root README
- Separated README structure: root for development, js-client for usage

### Changed
- Moved IDL file to `generator/idl/jupiter-perpetuals.json`
- Restructured project as monorepo with separate client package in `js-client/`
- Updated build scripts to use `build:js` naming convention
- Enhanced generator to create complete modular dist structure
- Improved development workflow with proper script separation

### Fixed
- Empty `PERPETUALS_PROGRAM_ADDRESS` constant now properly injected during generation
- Generator now creates complete TypeScript definitions and compiled JavaScript
- Modular export structure in generated client (accounts/, instructions/, types/, programs/)
- Cross-runtime compatibility issues in examples
- TypeScript compatibility issues with custody address handling

### Technical Implementation
- Implemented Codama-based generation pipeline with program address injection
- Added `updateProgramsVisitor` for proper program address: `PERPHjGBqRHArX4DySjwM6UJHiR3sWAatqfdBS2qQJu`
- Created modular compilation structure with full TypeScript definitions
- Enhanced JSDoc automation for better developer experience
- Separated development concerns from package distribution

### Repository Structure
```
jupiter-perps-client/
├── generator/              # IDL to TypeScript generation
│   ├── idl/               # Source IDL files
│   └── js/                # Generator scripts (generate.ts, add-jsdoc.ts)
├── js-client/             # Generated npm package (published to npm)
├── CHANGELOG.md           # Development changelog (this file)
└── README.md              # Development documentation
```

## [1.0.0] - 2025-07-14

### Added
- Initial repository setup with basic Codama-based client generation
- First npm package release with basic functionality