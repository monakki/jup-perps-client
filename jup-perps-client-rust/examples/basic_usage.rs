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
    println!("\u{1F680} Jupiter Perpetuals Rust Client Example");
    println!("==========================================\n");

    let rpc_url = std::env::var("SOLANA_RPC_URL")
        .unwrap_or_else(|_| "https://api.mainnet-beta.solana.com".to_string());
    let client = RpcClient::new_with_commitment(rpc_url.clone(), CommitmentConfig::confirmed());
    println!("   \u{2705} Connected to: {}", rpc_url);
    println!("   \u{1F4CD} Program ID: {}\n", PERPETUALS_ID);

    // 1. Pool data
    println!("\u{1F4B0} Jupiter Perpetuals Pool Information:");
    if let Err(e) = read_pool_data(&client) {
        println!("   \u{26A0}\u{FE0F}  Could not read pool data: {}", e);
    }

    // 2. USDC Custody borrow/lending data
    println!("\n\u{1F3E6} USDC Custody Borrow/Lending Data:");
    if let Err(e) = read_usdc_custody(&client) {
        println!("   \u{26A0}\u{FE0F}  Could not read custody data: {}", e);
    }

    // 3. BorrowPosition account
    println!("\n\u{1F4C4} BorrowPosition Account (new in v1.2.0):");
    if let Err(e) = read_borrow_position(&client) {
        println!("   \u{26A0}\u{FE0F}  Could not read borrow position: {}", e);
    }

    println!("\n\u{1F3AF} Example completed!");
    Ok(())
}

fn read_pool_data(client: &RpcClient) -> Result<(), Box<dyn std::error::Error>> {
    let pool_pubkey = Pubkey::from_str("5BUwFW4nRbftYTDMbgxykoFWqWHPzahFSNAaaaJtVKsq")?;
    let decoded_pool = fetch_pool(client, &pool_pubkey)?;
    let pool = &decoded_pool.data;

    println!("   \u{1F4CD} Pool Address: {}", pool_pubkey);
    println!("   \u{1F3DB}\u{FE0F}  Pool Name: '{}'", pool.name);
    println!(
        "   \u{1F4B0} AUM USD: ${:.2}",
        pool.aum_usd as f64 / 1_000_000.0
    );
    println!("   \u{1F3E6} Number of Custodies: {}", pool.custodies.len());

    println!("\n   \u{1F4CB} Custody Addresses:");
    for (i, custody_pubkey) in pool.custodies.iter().enumerate() {
        println!("   {}. {}", i + 1, custody_pubkey);
    }
    Ok(())
}

fn read_usdc_custody(client: &RpcClient) -> Result<(), Box<dyn std::error::Error>> {
    let custody_pubkey = Pubkey::from_str("G18jKKXQwBbrHeiK3C9MRXhkHsLHf7XgCSisykV46EZa")?;
    let decoded = fetch_custody(client, &custody_pubkey)?;
    let c = &decoded.data;

    println!("   \u{1F4CD} Custody: {}", custody_pubkey);
    println!("   \u{1FA99} Mint: {}", c.mint);
    println!("   \u{1F4B8} Total Debt: {}", c.debt);
    println!(
        "   \u{1F4B0} Borrow Limit (tokens): {}",
        c.borrow_limit_in_token_amount
    );
    println!(
        "   \u{1F4CA} Borrows Limit: {} bps",
        c.borrow_lend_parameters.borrows_limit_in_bps
    );
    println!(
        "   \u{1F6E1}\u{FE0F}  Maintenance Margin: {} bps",
        c.borrow_lend_parameters.maintainance_margin_bps
    );
    println!(
        "   \u{1F4B0} Min Interest Fee: {} bps",
        c.min_interest_fee_bps
    );
    Ok(())
}

fn read_borrow_position(client: &RpcClient) -> Result<(), Box<dyn std::error::Error>> {
    let bp_pubkey = Pubkey::from_str("84hK5omtZ1hGG4BxbbJUHSToapXn6yLbeZFU7bw1AnR5")?;
    let decoded = fetch_borrow_position(client, &bp_pubkey)?;
    let bp = &decoded.data;

    println!("   \u{1F4CD} Address: {}", bp_pubkey);
    println!("   \u{1F464} Owner: {}", bp.owner);
    println!("   \u{1F3E6} Custody: {}", bp.custody);
    println!("   \u{1F4B8} Borrow Size: {}", bp.borrow_size);
    println!("   \u{1F512} Locked Collateral: {}", bp.locked_collateral);
    println!("   \u{1F550} Open Time: {}", bp.open_time);
    println!("   \u{1F504} Last Borrowed: {}", bp.last_borrowed);
    Ok(())
}
