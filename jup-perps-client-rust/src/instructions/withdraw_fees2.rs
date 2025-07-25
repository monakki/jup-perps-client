//! This code was AUTOGENERATED using the codama library.
//! Please DO NOT EDIT THIS FILE, instead use visitors
//! to add features, then rerun codama to update it.
//!
//! <https://github.com/codama-idl/codama>
//!

use borsh::{BorshSerialize, BorshDeserialize};

/// Accounts.
#[derive(Debug)]
pub struct WithdrawFees2 {
      
              
          pub keeper: solana_program::pubkey::Pubkey,
          
              
          pub transfer_authority: solana_program::pubkey::Pubkey,
          
              
          pub perpetuals: solana_program::pubkey::Pubkey,
          
              
          pub pool: solana_program::pubkey::Pubkey,
          
              
          pub custody: solana_program::pubkey::Pubkey,
          
              
          pub custody_token_account: solana_program::pubkey::Pubkey,
          
              
          pub custody_doves_price_account: solana_program::pubkey::Pubkey,
          
              
          pub custody_pythnet_price_account: solana_program::pubkey::Pubkey,
          
              
          pub receiving_token_account: solana_program::pubkey::Pubkey,
          
              
          pub token_program: solana_program::pubkey::Pubkey,
      }

impl WithdrawFees2 {
  pub fn instruction(&self) -> solana_program::instruction::Instruction {
    self.instruction_with_remaining_accounts(&[])
  }
  #[allow(clippy::arithmetic_side_effects)]
  #[allow(clippy::vec_init_then_push)]
  pub fn instruction_with_remaining_accounts(&self, remaining_accounts: &[solana_program::instruction::AccountMeta]) -> solana_program::instruction::Instruction {
    let mut accounts = Vec::with_capacity(10+ remaining_accounts.len());
                            accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.keeper,
            true
          ));
                                          accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.transfer_authority,
            false
          ));
                                          accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.perpetuals,
            false
          ));
                                          accounts.push(solana_program::instruction::AccountMeta::new(
            self.pool,
            false
          ));
                                          accounts.push(solana_program::instruction::AccountMeta::new(
            self.custody,
            false
          ));
                                          accounts.push(solana_program::instruction::AccountMeta::new(
            self.custody_token_account,
            false
          ));
                                          accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.custody_doves_price_account,
            false
          ));
                                          accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.custody_pythnet_price_account,
            false
          ));
                                          accounts.push(solana_program::instruction::AccountMeta::new(
            self.receiving_token_account,
            false
          ));
                                          accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.token_program,
            false
          ));
                      accounts.extend_from_slice(remaining_accounts);
    let data = borsh::to_vec(&WithdrawFees2InstructionData::new()).unwrap();
    
    solana_program::instruction::Instruction {
      program_id: crate::PERPETUALS_ID,
      accounts,
      data,
    }
  }
}

#[derive(BorshSerialize, BorshDeserialize, Clone, Debug, PartialEq)]
#[cfg_attr(feature = "serde", derive(serde::Serialize, serde::Deserialize))]
 pub struct WithdrawFees2InstructionData {
            discriminator: [u8; 8],
      }

impl WithdrawFees2InstructionData {
  pub fn new() -> Self {
    Self {
                        discriminator: [252, 128, 143, 145, 225, 221, 159, 207],
                  }
  }
}

impl Default for WithdrawFees2InstructionData {
  fn default() -> Self {
    Self::new()
  }
}



/// Instruction builder for `WithdrawFees2`.
///
/// ### Accounts:
///
                ///   0. `[signer]` keeper
          ///   1. `[]` transfer_authority
          ///   2. `[]` perpetuals
                ///   3. `[writable]` pool
                ///   4. `[writable]` custody
                ///   5. `[writable]` custody_token_account
          ///   6. `[]` custody_doves_price_account
          ///   7. `[]` custody_pythnet_price_account
                ///   8. `[writable]` receiving_token_account
                ///   9. `[optional]` token_program (default to `TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA`)
#[derive(Clone, Debug, Default)]
pub struct WithdrawFees2Builder {
            keeper: Option<solana_program::pubkey::Pubkey>,
                transfer_authority: Option<solana_program::pubkey::Pubkey>,
                perpetuals: Option<solana_program::pubkey::Pubkey>,
                pool: Option<solana_program::pubkey::Pubkey>,
                custody: Option<solana_program::pubkey::Pubkey>,
                custody_token_account: Option<solana_program::pubkey::Pubkey>,
                custody_doves_price_account: Option<solana_program::pubkey::Pubkey>,
                custody_pythnet_price_account: Option<solana_program::pubkey::Pubkey>,
                receiving_token_account: Option<solana_program::pubkey::Pubkey>,
                token_program: Option<solana_program::pubkey::Pubkey>,
                __remaining_accounts: Vec<solana_program::instruction::AccountMeta>,
}

impl WithdrawFees2Builder {
  pub fn new() -> Self {
    Self::default()
  }
            #[inline(always)]
    pub fn keeper(&mut self, keeper: solana_program::pubkey::Pubkey) -> &mut Self {
                        self.keeper = Some(keeper);
                    self
    }
            #[inline(always)]
    pub fn transfer_authority(&mut self, transfer_authority: solana_program::pubkey::Pubkey) -> &mut Self {
                        self.transfer_authority = Some(transfer_authority);
                    self
    }
            #[inline(always)]
    pub fn perpetuals(&mut self, perpetuals: solana_program::pubkey::Pubkey) -> &mut Self {
                        self.perpetuals = Some(perpetuals);
                    self
    }
            #[inline(always)]
    pub fn pool(&mut self, pool: solana_program::pubkey::Pubkey) -> &mut Self {
                        self.pool = Some(pool);
                    self
    }
            #[inline(always)]
    pub fn custody(&mut self, custody: solana_program::pubkey::Pubkey) -> &mut Self {
                        self.custody = Some(custody);
                    self
    }
            #[inline(always)]
    pub fn custody_token_account(&mut self, custody_token_account: solana_program::pubkey::Pubkey) -> &mut Self {
                        self.custody_token_account = Some(custody_token_account);
                    self
    }
            #[inline(always)]
    pub fn custody_doves_price_account(&mut self, custody_doves_price_account: solana_program::pubkey::Pubkey) -> &mut Self {
                        self.custody_doves_price_account = Some(custody_doves_price_account);
                    self
    }
            #[inline(always)]
    pub fn custody_pythnet_price_account(&mut self, custody_pythnet_price_account: solana_program::pubkey::Pubkey) -> &mut Self {
                        self.custody_pythnet_price_account = Some(custody_pythnet_price_account);
                    self
    }
            #[inline(always)]
    pub fn receiving_token_account(&mut self, receiving_token_account: solana_program::pubkey::Pubkey) -> &mut Self {
                        self.receiving_token_account = Some(receiving_token_account);
                    self
    }
            /// `[optional account, default to 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA']`
#[inline(always)]
    pub fn token_program(&mut self, token_program: solana_program::pubkey::Pubkey) -> &mut Self {
                        self.token_program = Some(token_program);
                    self
    }
            /// Add an additional account to the instruction.
  #[inline(always)]
  pub fn add_remaining_account(&mut self, account: solana_program::instruction::AccountMeta) -> &mut Self {
    self.__remaining_accounts.push(account);
    self
  }
  /// Add additional accounts to the instruction.
  #[inline(always)]
  pub fn add_remaining_accounts(&mut self, accounts: &[solana_program::instruction::AccountMeta]) -> &mut Self {
    self.__remaining_accounts.extend_from_slice(accounts);
    self
  }
  #[allow(clippy::clone_on_copy)]
  pub fn instruction(&self) -> solana_program::instruction::Instruction {
    let accounts = WithdrawFees2 {
                              keeper: self.keeper.expect("keeper is not set"),
                                        transfer_authority: self.transfer_authority.expect("transfer_authority is not set"),
                                        perpetuals: self.perpetuals.expect("perpetuals is not set"),
                                        pool: self.pool.expect("pool is not set"),
                                        custody: self.custody.expect("custody is not set"),
                                        custody_token_account: self.custody_token_account.expect("custody_token_account is not set"),
                                        custody_doves_price_account: self.custody_doves_price_account.expect("custody_doves_price_account is not set"),
                                        custody_pythnet_price_account: self.custody_pythnet_price_account.expect("custody_pythnet_price_account is not set"),
                                        receiving_token_account: self.receiving_token_account.expect("receiving_token_account is not set"),
                                        token_program: self.token_program.unwrap_or(solana_program::pubkey!("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")),
                      };
    
    accounts.instruction_with_remaining_accounts(&self.__remaining_accounts)
  }
}

  /// `withdraw_fees2` CPI accounts.
  pub struct WithdrawFees2CpiAccounts<'a, 'b> {
          
                    
              pub keeper: &'b solana_program::account_info::AccountInfo<'a>,
                
                    
              pub transfer_authority: &'b solana_program::account_info::AccountInfo<'a>,
                
                    
              pub perpetuals: &'b solana_program::account_info::AccountInfo<'a>,
                
                    
              pub pool: &'b solana_program::account_info::AccountInfo<'a>,
                
                    
              pub custody: &'b solana_program::account_info::AccountInfo<'a>,
                
                    
              pub custody_token_account: &'b solana_program::account_info::AccountInfo<'a>,
                
                    
              pub custody_doves_price_account: &'b solana_program::account_info::AccountInfo<'a>,
                
                    
              pub custody_pythnet_price_account: &'b solana_program::account_info::AccountInfo<'a>,
                
                    
              pub receiving_token_account: &'b solana_program::account_info::AccountInfo<'a>,
                
                    
              pub token_program: &'b solana_program::account_info::AccountInfo<'a>,
            }

/// `withdraw_fees2` CPI instruction.
pub struct WithdrawFees2Cpi<'a, 'b> {
  /// The program to invoke.
  pub __program: &'b solana_program::account_info::AccountInfo<'a>,
      
              
          pub keeper: &'b solana_program::account_info::AccountInfo<'a>,
          
              
          pub transfer_authority: &'b solana_program::account_info::AccountInfo<'a>,
          
              
          pub perpetuals: &'b solana_program::account_info::AccountInfo<'a>,
          
              
          pub pool: &'b solana_program::account_info::AccountInfo<'a>,
          
              
          pub custody: &'b solana_program::account_info::AccountInfo<'a>,
          
              
          pub custody_token_account: &'b solana_program::account_info::AccountInfo<'a>,
          
              
          pub custody_doves_price_account: &'b solana_program::account_info::AccountInfo<'a>,
          
              
          pub custody_pythnet_price_account: &'b solana_program::account_info::AccountInfo<'a>,
          
              
          pub receiving_token_account: &'b solana_program::account_info::AccountInfo<'a>,
          
              
          pub token_program: &'b solana_program::account_info::AccountInfo<'a>,
        }

impl<'a, 'b> WithdrawFees2Cpi<'a, 'b> {
  pub fn new(
    program: &'b solana_program::account_info::AccountInfo<'a>,
          accounts: WithdrawFees2CpiAccounts<'a, 'b>,
          ) -> Self {
    Self {
      __program: program,
              keeper: accounts.keeper,
              transfer_authority: accounts.transfer_authority,
              perpetuals: accounts.perpetuals,
              pool: accounts.pool,
              custody: accounts.custody,
              custody_token_account: accounts.custody_token_account,
              custody_doves_price_account: accounts.custody_doves_price_account,
              custody_pythnet_price_account: accounts.custody_pythnet_price_account,
              receiving_token_account: accounts.receiving_token_account,
              token_program: accounts.token_program,
                }
  }
  #[inline(always)]
  pub fn invoke(&self) -> solana_program::entrypoint::ProgramResult {
    self.invoke_signed_with_remaining_accounts(&[], &[])
  }
  #[inline(always)]
  pub fn invoke_with_remaining_accounts(&self, remaining_accounts: &[(&'b solana_program::account_info::AccountInfo<'a>, bool, bool)]) -> solana_program::entrypoint::ProgramResult {
    self.invoke_signed_with_remaining_accounts(&[], remaining_accounts)
  }
  #[inline(always)]
  pub fn invoke_signed(&self, signers_seeds: &[&[&[u8]]]) -> solana_program::entrypoint::ProgramResult {
    self.invoke_signed_with_remaining_accounts(signers_seeds, &[])
  }
  #[allow(clippy::arithmetic_side_effects)]
  #[allow(clippy::clone_on_copy)]
  #[allow(clippy::vec_init_then_push)]
  pub fn invoke_signed_with_remaining_accounts(
    &self,
    signers_seeds: &[&[&[u8]]],
    remaining_accounts: &[(&'b solana_program::account_info::AccountInfo<'a>, bool, bool)]
  ) -> solana_program::entrypoint::ProgramResult {
    let mut accounts = Vec::with_capacity(10+ remaining_accounts.len());
                            accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.keeper.key,
            true
          ));
                                          accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.transfer_authority.key,
            false
          ));
                                          accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.perpetuals.key,
            false
          ));
                                          accounts.push(solana_program::instruction::AccountMeta::new(
            *self.pool.key,
            false
          ));
                                          accounts.push(solana_program::instruction::AccountMeta::new(
            *self.custody.key,
            false
          ));
                                          accounts.push(solana_program::instruction::AccountMeta::new(
            *self.custody_token_account.key,
            false
          ));
                                          accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.custody_doves_price_account.key,
            false
          ));
                                          accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.custody_pythnet_price_account.key,
            false
          ));
                                          accounts.push(solana_program::instruction::AccountMeta::new(
            *self.receiving_token_account.key,
            false
          ));
                                          accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.token_program.key,
            false
          ));
                      remaining_accounts.iter().for_each(|remaining_account| {
      accounts.push(solana_program::instruction::AccountMeta {
          pubkey: *remaining_account.0.key,
          is_signer: remaining_account.1,
          is_writable: remaining_account.2,
      })
    });
    let data = borsh::to_vec(&WithdrawFees2InstructionData::new()).unwrap();
    
    let instruction = solana_program::instruction::Instruction {
      program_id: crate::PERPETUALS_ID,
      accounts,
      data,
    };
    let mut account_infos = Vec::with_capacity(11 + remaining_accounts.len());
    account_infos.push(self.__program.clone());
                  account_infos.push(self.keeper.clone());
                        account_infos.push(self.transfer_authority.clone());
                        account_infos.push(self.perpetuals.clone());
                        account_infos.push(self.pool.clone());
                        account_infos.push(self.custody.clone());
                        account_infos.push(self.custody_token_account.clone());
                        account_infos.push(self.custody_doves_price_account.clone());
                        account_infos.push(self.custody_pythnet_price_account.clone());
                        account_infos.push(self.receiving_token_account.clone());
                        account_infos.push(self.token_program.clone());
              remaining_accounts.iter().for_each(|remaining_account| account_infos.push(remaining_account.0.clone()));

    if signers_seeds.is_empty() {
      solana_program::program::invoke(&instruction, &account_infos)
    } else {
      solana_program::program::invoke_signed(&instruction, &account_infos, signers_seeds)
    }
  }
}

/// Instruction builder for `WithdrawFees2` via CPI.
///
/// ### Accounts:
///
                ///   0. `[signer]` keeper
          ///   1. `[]` transfer_authority
          ///   2. `[]` perpetuals
                ///   3. `[writable]` pool
                ///   4. `[writable]` custody
                ///   5. `[writable]` custody_token_account
          ///   6. `[]` custody_doves_price_account
          ///   7. `[]` custody_pythnet_price_account
                ///   8. `[writable]` receiving_token_account
          ///   9. `[]` token_program
#[derive(Clone, Debug)]
pub struct WithdrawFees2CpiBuilder<'a, 'b> {
  instruction: Box<WithdrawFees2CpiBuilderInstruction<'a, 'b>>,
}

impl<'a, 'b> WithdrawFees2CpiBuilder<'a, 'b> {
  pub fn new(program: &'b solana_program::account_info::AccountInfo<'a>) -> Self {
    let instruction = Box::new(WithdrawFees2CpiBuilderInstruction {
      __program: program,
              keeper: None,
              transfer_authority: None,
              perpetuals: None,
              pool: None,
              custody: None,
              custody_token_account: None,
              custody_doves_price_account: None,
              custody_pythnet_price_account: None,
              receiving_token_account: None,
              token_program: None,
                                __remaining_accounts: Vec::new(),
    });
    Self { instruction }
  }
      #[inline(always)]
    pub fn keeper(&mut self, keeper: &'b solana_program::account_info::AccountInfo<'a>) -> &mut Self {
                        self.instruction.keeper = Some(keeper);
                    self
    }
      #[inline(always)]
    pub fn transfer_authority(&mut self, transfer_authority: &'b solana_program::account_info::AccountInfo<'a>) -> &mut Self {
                        self.instruction.transfer_authority = Some(transfer_authority);
                    self
    }
      #[inline(always)]
    pub fn perpetuals(&mut self, perpetuals: &'b solana_program::account_info::AccountInfo<'a>) -> &mut Self {
                        self.instruction.perpetuals = Some(perpetuals);
                    self
    }
      #[inline(always)]
    pub fn pool(&mut self, pool: &'b solana_program::account_info::AccountInfo<'a>) -> &mut Self {
                        self.instruction.pool = Some(pool);
                    self
    }
      #[inline(always)]
    pub fn custody(&mut self, custody: &'b solana_program::account_info::AccountInfo<'a>) -> &mut Self {
                        self.instruction.custody = Some(custody);
                    self
    }
      #[inline(always)]
    pub fn custody_token_account(&mut self, custody_token_account: &'b solana_program::account_info::AccountInfo<'a>) -> &mut Self {
                        self.instruction.custody_token_account = Some(custody_token_account);
                    self
    }
      #[inline(always)]
    pub fn custody_doves_price_account(&mut self, custody_doves_price_account: &'b solana_program::account_info::AccountInfo<'a>) -> &mut Self {
                        self.instruction.custody_doves_price_account = Some(custody_doves_price_account);
                    self
    }
      #[inline(always)]
    pub fn custody_pythnet_price_account(&mut self, custody_pythnet_price_account: &'b solana_program::account_info::AccountInfo<'a>) -> &mut Self {
                        self.instruction.custody_pythnet_price_account = Some(custody_pythnet_price_account);
                    self
    }
      #[inline(always)]
    pub fn receiving_token_account(&mut self, receiving_token_account: &'b solana_program::account_info::AccountInfo<'a>) -> &mut Self {
                        self.instruction.receiving_token_account = Some(receiving_token_account);
                    self
    }
      #[inline(always)]
    pub fn token_program(&mut self, token_program: &'b solana_program::account_info::AccountInfo<'a>) -> &mut Self {
                        self.instruction.token_program = Some(token_program);
                    self
    }
            /// Add an additional account to the instruction.
  #[inline(always)]
  pub fn add_remaining_account(&mut self, account: &'b solana_program::account_info::AccountInfo<'a>, is_writable: bool, is_signer: bool) -> &mut Self {
    self.instruction.__remaining_accounts.push((account, is_writable, is_signer));
    self
  }
  /// Add additional accounts to the instruction.
  ///
  /// Each account is represented by a tuple of the `AccountInfo`, a `bool` indicating whether the account is writable or not,
  /// and a `bool` indicating whether the account is a signer or not.
  #[inline(always)]
  pub fn add_remaining_accounts(&mut self, accounts: &[(&'b solana_program::account_info::AccountInfo<'a>, bool, bool)]) -> &mut Self {
    self.instruction.__remaining_accounts.extend_from_slice(accounts);
    self
  }
  #[inline(always)]
  pub fn invoke(&self) -> solana_program::entrypoint::ProgramResult {
    self.invoke_signed(&[])
  }
  #[allow(clippy::clone_on_copy)]
  #[allow(clippy::vec_init_then_push)]
  pub fn invoke_signed(&self, signers_seeds: &[&[&[u8]]]) -> solana_program::entrypoint::ProgramResult {
        let instruction = WithdrawFees2Cpi {
        __program: self.instruction.__program,
                  
          keeper: self.instruction.keeper.expect("keeper is not set"),
                  
          transfer_authority: self.instruction.transfer_authority.expect("transfer_authority is not set"),
                  
          perpetuals: self.instruction.perpetuals.expect("perpetuals is not set"),
                  
          pool: self.instruction.pool.expect("pool is not set"),
                  
          custody: self.instruction.custody.expect("custody is not set"),
                  
          custody_token_account: self.instruction.custody_token_account.expect("custody_token_account is not set"),
                  
          custody_doves_price_account: self.instruction.custody_doves_price_account.expect("custody_doves_price_account is not set"),
                  
          custody_pythnet_price_account: self.instruction.custody_pythnet_price_account.expect("custody_pythnet_price_account is not set"),
                  
          receiving_token_account: self.instruction.receiving_token_account.expect("receiving_token_account is not set"),
                  
          token_program: self.instruction.token_program.expect("token_program is not set"),
                    };
    instruction.invoke_signed_with_remaining_accounts(signers_seeds, &self.instruction.__remaining_accounts)
  }
}

#[derive(Clone, Debug)]
struct WithdrawFees2CpiBuilderInstruction<'a, 'b> {
  __program: &'b solana_program::account_info::AccountInfo<'a>,
            keeper: Option<&'b solana_program::account_info::AccountInfo<'a>>,
                transfer_authority: Option<&'b solana_program::account_info::AccountInfo<'a>>,
                perpetuals: Option<&'b solana_program::account_info::AccountInfo<'a>>,
                pool: Option<&'b solana_program::account_info::AccountInfo<'a>>,
                custody: Option<&'b solana_program::account_info::AccountInfo<'a>>,
                custody_token_account: Option<&'b solana_program::account_info::AccountInfo<'a>>,
                custody_doves_price_account: Option<&'b solana_program::account_info::AccountInfo<'a>>,
                custody_pythnet_price_account: Option<&'b solana_program::account_info::AccountInfo<'a>>,
                receiving_token_account: Option<&'b solana_program::account_info::AccountInfo<'a>>,
                token_program: Option<&'b solana_program::account_info::AccountInfo<'a>>,
                /// Additional instruction accounts `(AccountInfo, is_writable, is_signer)`.
  __remaining_accounts: Vec<(&'b solana_program::account_info::AccountInfo<'a>, bool, bool)>,
}

