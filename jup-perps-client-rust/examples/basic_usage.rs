/*!
 * Jupiter Perpetuals Rust Client Example
 *
 * This example demonstrates how to use the Jupiter Perpetuals Rust client
 * to read real on-chain data from the Jupiter Perpetuals protocol.
 */

use jup_perps_client::{accounts::*, programs::PERPETUALS_ID};
use solana_client::rpc_client::RpcClient;
use solana_program::pubkey::Pubkey;
use solana_sdk::commitment_config::CommitmentConfig;
use std::str::FromStr;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    println!("🚀 Jupiter Perpetuals Rust Client Example");
    println!("==========================================\n");

    // Setup RPC client
    println!("🔗 Setting up RPC connection...");
    let rpc_url = std::env::var("SOLANA_RPC_URL")
        .unwrap_or_else(|_| "https://api.mainnet-beta.solana.com".to_string());
    let client = RpcClient::new_with_commitment(rpc_url.clone(), CommitmentConfig::confirmed());
    println!("   ✅ Connected to: {}", rpc_url);
    println!("   📍 Program ID: {}\n", PERPETUALS_ID);

    // Read Jupiter Labs Perpetuals Markets pool data
    println!("💰 Jupiter Perpetuals Pool Information:");
    if let Err(e) = read_pool_data(&client).await {
        println!("   ⚠️  Could not read pool data: {}", e);
    }

    println!("\n🎯 Example completed!");
    println!("💡 Use this client to read Jupiter Perpetuals on-chain data!");

    Ok(())
}

async fn read_pool_data(client: &RpcClient) -> Result<(), Box<dyn std::error::Error>> {
    // Jupiter Labs Perpetuals Markets pool address
    let pool_address = "5BUwFW4nRbftYTDMbgxykoFWqWHPzahFSNAaaaJtVKsq";
    let pool_pubkey = Pubkey::from_str(pool_address)?;

    println!("📍 Pool Address: {}", pool_pubkey);

    let decoded_pool = fetch_pool(client, &pool_pubkey)?;

    println!("✅ Pool Data Fetched!");
    println!("   📏 Size: {} bytes", decoded_pool.account.data.len());
    println!(
        "   💰 Balance: {} SOL",
        decoded_pool.account.lamports as f64 / 1_000_000_000.0
    );

    let pool = &decoded_pool.data;
    println!("\n🏛️  Pool Name: '{}'", pool.name);
    println!("💰 AUM USD: ${:.2}", pool.aum_usd as f64 / 1_000_000.0);
    println!("🏦 Number of Custodies: {}", pool.custodies.len());

    println!("\n📋 Custody Addresses:");
    for (i, custody_pubkey) in pool.custodies.iter().enumerate() {
        println!("   {}. {}", i + 1, custody_pubkey);
    }

    Ok(())
}
