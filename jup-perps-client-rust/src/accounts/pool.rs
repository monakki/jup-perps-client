//! This code was AUTOGENERATED using the codama library.
//! Please DO NOT EDIT THIS FILE, instead use visitors
//! to add features, then rerun codama to update it.
//!
//! <https://github.com/codama-idl/codama>
//!

use solana_program::pubkey::Pubkey;
use crate::types::Limit;
use crate::types::Fees;
use crate::types::PoolApr;
use borsh::BorshSerialize;
use borsh::BorshDeserialize;


#[derive(BorshSerialize, BorshDeserialize, Clone, Debug, PartialEq)]
#[cfg_attr(feature = "serde", derive(serde::Serialize, serde::Deserialize))]
/// Jupiter Perpetuals liquidity pool containing custody accounts and fees
pub struct Pool {
pub discriminator: [u8; 8],
pub name: String,
#[cfg_attr(feature = "serde", serde(with = "serde_with::As::<Vec<serde_with::DisplayFromStr>>"))]
pub custodies: Vec<Pubkey>,
pub aum_usd: u128,
pub limit: Limit,
pub fees: Fees,
pub pool_apr: PoolApr,
pub max_request_execution_sec: i64,
pub bump: u8,
pub lp_token_bump: u8,
pub inception_time: i64,
}


impl Pool {
  
  
  
  #[inline(always)]
  /// Deserializes account data from raw bytes
/// 
/// # Arguments
/// * `rpc` - Solana RPC client
/// * `address` - Account address to fetch
/// 
/// # Returns
/// * `Result<T, std::io::Error>` - Decoded account data or error
pub fn from_bytes(data: &[u8]) -> Result<Self, std::io::Error> {
    let mut data = data;
    Self::deserialize(&mut data)
  }
}

impl<'a> TryFrom<&solana_program::account_info::AccountInfo<'a>> for Pool {
  type Error = std::io::Error;

  fn try_from(account_info: &solana_program::account_info::AccountInfo<'a>) -> Result<Self, Self::Error> {
      let mut data: &[u8] = &(*account_info.data).borrow();
      Self::deserialize(&mut data)
  }
}

#[cfg(feature = "fetch")]
/// Fetches Jupiter Perpetuals liquidity pool data from Solana
/// 
/// # Arguments
/// * `rpc` - Solana RPC client
/// * `address` - Account address to fetch
/// 
/// # Returns
/// * `Result<T, std::io::Error>` - Decoded account data or error
pub fn fetch_pool(
  rpc: &solana_client::rpc_client::RpcClient,
  address: &solana_program::pubkey::Pubkey,
) -> Result<crate::shared::DecodedAccount<Pool>, std::io::Error> {
  let accounts = fetch_all_pool(rpc, &[*address])?;
  Ok(accounts[0].clone())
}

#[cfg(feature = "fetch")]
/// Fetches multiple pool accounts in batch
/// 
/// # Arguments
/// * `rpc` - Solana RPC client
/// * `address` - Account address to fetch
/// 
/// # Returns
/// * `Result<T, std::io::Error>` - Decoded account data or error
pub fn fetch_all_pool(
  rpc: &solana_client::rpc_client::RpcClient,
  addresses: &[solana_program::pubkey::Pubkey],
) -> Result<Vec<crate::shared::DecodedAccount<Pool>>, std::io::Error> {
    let accounts = rpc.get_multiple_accounts(addresses)
      .map_err(|e| std::io::Error::new(std::io::ErrorKind::Other, e.to_string()))?;
    let mut decoded_accounts: Vec<crate::shared::DecodedAccount<Pool>> = Vec::new();
    for i in 0..addresses.len() {
      let address = addresses[i];
      let account = accounts[i].as_ref()
        .ok_or(std::io::Error::new(std::io::ErrorKind::Other, format!("Account not found: {}", address)))?;
      let data = Pool::from_bytes(&account.data)?;
      decoded_accounts.push(crate::shared::DecodedAccount { address, account: account.clone(), data });
    }
    Ok(decoded_accounts)
}

#[cfg(feature = "fetch")]
/// Safely fetches pool data (returns None if not found)
/// 
/// # Arguments
/// * `rpc` - Solana RPC client
/// * `address` - Account address to fetch
/// 
/// # Returns
/// * `Result<T, std::io::Error>` - Decoded account data or error
pub fn fetch_maybe_pool(
  rpc: &solana_client::rpc_client::RpcClient,
  address: &solana_program::pubkey::Pubkey,
) -> Result<crate::shared::MaybeAccount<Pool>, std::io::Error> {
    let accounts = fetch_all_maybe_pool(rpc, &[*address])?;
    Ok(accounts[0].clone())
}

#[cfg(feature = "fetch")]
pub fn fetch_all_maybe_pool(
  rpc: &solana_client::rpc_client::RpcClient,
  addresses: &[solana_program::pubkey::Pubkey],
) -> Result<Vec<crate::shared::MaybeAccount<Pool>>, std::io::Error> {
    let accounts = rpc.get_multiple_accounts(addresses)
      .map_err(|e| std::io::Error::new(std::io::ErrorKind::Other, e.to_string()))?;
    let mut decoded_accounts: Vec<crate::shared::MaybeAccount<Pool>> = Vec::new();
    for i in 0..addresses.len() {
      let address = addresses[i];
      if let Some(account) = accounts[i].as_ref() {
        let data = Pool::from_bytes(&account.data)?;
        decoded_accounts.push(crate::shared::MaybeAccount::Exists(crate::shared::DecodedAccount { address, account: account.clone(), data }));
      } else {
        decoded_accounts.push(crate::shared::MaybeAccount::NotFound(address));
      }
    }
  Ok(decoded_accounts)
}


