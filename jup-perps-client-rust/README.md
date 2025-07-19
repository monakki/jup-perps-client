# Jupiter Perpetuals Rust Client

[![Crates.io](https://img.shields.io/crates/v/jup-perps-client.svg)](https://crates.io/crates/jup-perps-client)
[![Documentation](https://img.shields.io/badge/docs-rustdoc-blue.svg)](https://docs.rs/jup-perps-client)
[![Rust](https://img.shields.io/badge/Rust-Ready-red.svg)](https://www.rust-lang.org/)
[![Solana](https://img.shields.io/badge/Solana-Ready-green.svg)](https://solana.com/)
[![DeFi](https://img.shields.io/badge/DeFi-Trading-purple.svg)](https://dev.jup.ag/docs/perp-api/)
[![License](https://img.shields.io/crates/l/jup-perps-client.svg)](https://github.com/monakki/jup-perps-client/blob/main/LICENSE)

A Rust client for Jupiter Perpetuals Protocol, auto-generated from IDL using Codama.

## 🚀 Installation

Add to your `Cargo.toml`:

```toml
[dependencies]
jup-perps-client = "1.0"
solana-client = "1.18"  # For RPC functionality
```

## 🔧 Usage

### Basic Example - Pool Data

```rust
use jup_perps_client::{fetch_pool, fetch_custody};
use solana_client::rpc_client::RpcClient;
use solana_program::pubkey::Pubkey;
use std::str::FromStr;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Use SOLANA_RPC_URL environment variable or default to mainnet
    let rpc_url = std::env::var("SOLANA_RPC_URL")
        .unwrap_or_else(|_| "https://api.mainnet-beta.solana.com".to_string());
    let client = RpcClient::new(rpc_url);
    
    // Jupiter Labs Perpetuals Markets
    let pool_address = "5BUwFW4nRbftYTDMbgxykoFWqWHPzahFSNAaaaJtVKsq";
    let pool_pubkey = Pubkey::from_str(pool_address)?;
    let pool = fetch_pool(&client, &pool_pubkey)?;
    
    println!("📛 Pool Name: {}", pool.data.name);
    println!("🏦 Number of Custodies: {}", pool.data.custodies.len());
    println!("💰 AUM USD: ${:.2}", pool.data.aum_usd as f64 / 1_000_000.0);
    
    // Fetch custody details
    for (i, custody_address) in pool.data.custodies.iter().enumerate() {
        let custody = fetch_custody(&client, custody_address)?;
        
        println!("\n🪙 Custody {}:", i + 1);
        println!("   Token Mint: {}", custody.data.mint);
        println!("   Assets Owned: {}", custody.data.assets.owned);
        println!("   Decimals: {}", custody.data.decimals);
        println!("   Target Ratio: {} bps", custody.data.target_ratio_bps);
    }
    
    Ok(())
}
```

**Example Output:**
```
📛 Pool Name: Pool
🏦 Number of Custodies: 5
💰 AUM USD: $1553760440.14

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

### Environment Variables

You can customize the RPC endpoint using environment variables:

```bash
# Use a custom RPC endpoint
export SOLANA_RPC_URL="https://your-rpc-endpoint.com"
cargo run --example basic_usage

# Or run with inline environment variable
SOLANA_RPC_URL="https://your-rpc-endpoint.com" cargo run --example basic_usage
```

### On-chain Program Usage

```rust
use jup_perps_rust_client::{accounts::*, types::*};

// Use the generated types in your on-chain program
let pool_account = Pool::default();
```

## 📚 API Reference

### Account Functions

#### Main Functions
- `fetch_perpetuals(rpc, address)` - Get main protocol data
- `fetch_pool(rpc, address)` - Get liquidity pool data  
- `fetch_position(rpc, address)` - Get position data
- `fetch_custody(rpc, address)` - Get token custody data
- `fetch_token_ledger(rpc, address)` - Get token ledger data
- `fetch_position_request(rpc, address)` - Get position request data

#### Batch Functions
- `fetch_all_perpetuals(rpc, addresses)` - Fetch multiple protocol accounts
- `fetch_all_pool(rpc, addresses)` - Fetch multiple pools
- `fetch_all_position(rpc, addresses)` - Fetch multiple positions

#### Safe Functions (Maybe variants)
- `fetch_maybe_perpetuals(rpc, address)` - Safe protocol data fetch
- `fetch_maybe_pool(rpc, address)` - Safe pool data fetch
- `fetch_maybe_position(rpc, address)` - Safe position data fetch

### Types

All data types are available:

```rust
use jup_perps_client::{
    Perpetuals,
    Pool, 
    Position,
    Custody,
    PositionRequest,
    TokenLedger,
    // ... and many more
};
```

### Constants

```rust
use jup_perps_client::PERPETUALS_PROGRAM_ADDRESS;

println!("Program Address: {}", PERPETUALS_PROGRAM_ADDRESS);
```

## 🛠️ Features

- 🦀 Native Rust types with comprehensive traits
- 🔗 Full Anchor integration
- 📦 Borsh serialization support
- 🌐 **RPC client functions (enabled by default)**
- 🔄 Optional Serde support (enable `serde` feature)

### Feature Flags

- `fetch` (default) - Enables RPC client functions like `fetch_pool()`. Includes `solana-client` and `solana-account` dependencies
- `serde` - Enables JSON serialization/deserialization support
- `anchor` - Additional Anchor-specific functionality
- `anchor-idl-build` - IDL build support

For minimal on-chain usage without RPC dependencies:

```toml
[dependencies]
jup-perps-client = { version = "1.0", default-features = false }
```

## 🛠️ Generated Client

This client is auto-generated from Jupiter Perpetuals IDL using [Codama](https://github.com/codama-idl/codama).

### Requirements

- Rust ≥ 1.75.0
- Cargo

## 📄 License

MIT

## 🤝 Contributing

This client is auto-generated from Jupiter Perpetuals IDL files using Codama.
For issues or feature requests, please visit the [main repository](https://github.com/monakki/jup-perps-client).

## 🔗 Links

- [Jupiter Perpetuals API Documentation](https://dev.jup.ag/docs/perp-api/)
- [Codama IDL Framework](https://github.com/codama-idl/codama)
- [Rust Documentation](https://docs.rs/jup-perps-client)

## ⚠️ Important Notes

- This client is designed for reading data from Jupiter Perpetuals
- For creating transactions, use the appropriate instructions from the `instructions` module
- Always verify account addresses are current and valid
- Use reliable RPC endpoints for production applications
- The generated code includes comprehensive Rust documentation (rustdoc)

## 💰 Support

If this client helps you build amazing Solana applications, consider supporting the project:

**Solana**: `uJHFSYDcCRH2c6VLXY1kWBqGFmBb7JbF7FN8bsGAFtx`

Your support helps maintain and improve this package for the community!