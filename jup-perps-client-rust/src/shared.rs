//! This code was AUTOGENERATED using the codama library.
//! Please DO NOT EDIT THIS FILE, instead use visitors
//! to add features, then rerun codama to update it.
//!
//! <https://github.com/codama-idl/codama>
//!




    #[cfg(feature = "fetch")]
    #[derive(Debug, Clone)]
    pub struct DecodedAccount<T> {
        pub address: solana_program::pubkey::Pubkey,
        pub account: solana_account::Account,
        pub data: T,
    }

    #[cfg(feature = "fetch")]
    #[derive(Debug, Clone)]
    pub enum MaybeAccount<T> {
        Exists(DecodedAccount<T>),
        NotFound(solana_program::pubkey::Pubkey),
    }


