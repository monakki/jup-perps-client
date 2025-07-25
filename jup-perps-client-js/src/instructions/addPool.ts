/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  addDecoderSizePrefix,
  addEncoderSizePrefix,
  combineCodec,
  fixDecoderSize,
  fixEncoderSize,
  getBytesDecoder,
  getBytesEncoder,
  getI64Decoder,
  getI64Encoder,
  getStructDecoder,
  getStructEncoder,
  getU32Decoder,
  getU32Encoder,
  getUtf8Decoder,
  getUtf8Encoder,
  transformEncoder,
  type AccountMeta,
  type AccountSignerMeta,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type Instruction,
  type InstructionWithAccounts,
  type InstructionWithData,
  type ReadonlyAccount,
  type ReadonlyUint8Array,
  type TransactionSigner,
  type WritableAccount,
  type WritableSignerAccount,
} from '@solana/kit'
import { PERPETUALS_PROGRAM_ADDRESS } from '../programs'
import { getAccountMetaFactory, type ResolvedAccount } from '../shared'
import {
  getFeesDecoder,
  getFeesEncoder,
  getLimitDecoder,
  getLimitEncoder,
  type Fees,
  type FeesArgs,
  type Limit,
  type LimitArgs,
} from '../types'

export const ADD_POOL_DISCRIMINATOR = new Uint8Array([
  115, 230, 212, 211, 175, 49, 39, 169,
])

export function getAddPoolDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(ADD_POOL_DISCRIMINATOR)
}

export type AddPoolInstruction<
  TProgram extends string = typeof PERPETUALS_PROGRAM_ADDRESS,
  TAccountAdmin extends string | AccountMeta<string> = string,
  TAccountTransferAuthority extends string | AccountMeta<string> = string,
  TAccountPerpetuals extends string | AccountMeta<string> = string,
  TAccountPool extends string | AccountMeta<string> = string,
  TAccountLpTokenMint extends string | AccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | AccountMeta<string> = '11111111111111111111111111111111',
  TAccountTokenProgram extends
    | string
    | AccountMeta<string> = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  TAccountRent extends
    | string
    | AccountMeta<string> = 'SysvarRent111111111111111111111111111111111',
  TRemainingAccounts extends readonly AccountMeta<string>[] = [],
> = Instruction<TProgram> &
  InstructionWithData<ReadonlyUint8Array> &
  InstructionWithAccounts<
    [
      TAccountAdmin extends string
        ? WritableSignerAccount<TAccountAdmin> &
            AccountSignerMeta<TAccountAdmin>
        : TAccountAdmin,
      TAccountTransferAuthority extends string
        ? ReadonlyAccount<TAccountTransferAuthority>
        : TAccountTransferAuthority,
      TAccountPerpetuals extends string
        ? WritableAccount<TAccountPerpetuals>
        : TAccountPerpetuals,
      TAccountPool extends string
        ? WritableAccount<TAccountPool>
        : TAccountPool,
      TAccountLpTokenMint extends string
        ? WritableAccount<TAccountLpTokenMint>
        : TAccountLpTokenMint,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      TAccountTokenProgram extends string
        ? ReadonlyAccount<TAccountTokenProgram>
        : TAccountTokenProgram,
      TAccountRent extends string
        ? ReadonlyAccount<TAccountRent>
        : TAccountRent,
      ...TRemainingAccounts,
    ]
  >

export type AddPoolInstructionData = {
  discriminator: ReadonlyUint8Array
  name: string
  limit: Limit
  fees: Fees
  maxRequestExecutionSec: bigint
}

export type AddPoolInstructionDataArgs = {
  name: string
  limit: LimitArgs
  fees: FeesArgs
  maxRequestExecutionSec: number | bigint
}

export function getAddPoolInstructionDataEncoder(): Encoder<AddPoolInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['name', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
      ['limit', getLimitEncoder()],
      ['fees', getFeesEncoder()],
      ['maxRequestExecutionSec', getI64Encoder()],
    ]),
    (value) => ({ ...value, discriminator: ADD_POOL_DISCRIMINATOR })
  )
}

export function getAddPoolInstructionDataDecoder(): Decoder<AddPoolInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['name', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
    ['limit', getLimitDecoder()],
    ['fees', getFeesDecoder()],
    ['maxRequestExecutionSec', getI64Decoder()],
  ])
}

export function getAddPoolInstructionDataCodec(): Codec<
  AddPoolInstructionDataArgs,
  AddPoolInstructionData
> {
  return combineCodec(
    getAddPoolInstructionDataEncoder(),
    getAddPoolInstructionDataDecoder()
  )
}

export type AddPoolInput<
  TAccountAdmin extends string = string,
  TAccountTransferAuthority extends string = string,
  TAccountPerpetuals extends string = string,
  TAccountPool extends string = string,
  TAccountLpTokenMint extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountTokenProgram extends string = string,
  TAccountRent extends string = string,
> = {
  admin: TransactionSigner<TAccountAdmin>
  transferAuthority: Address<TAccountTransferAuthority>
  perpetuals: Address<TAccountPerpetuals>
  pool: Address<TAccountPool>
  lpTokenMint: Address<TAccountLpTokenMint>
  systemProgram?: Address<TAccountSystemProgram>
  tokenProgram?: Address<TAccountTokenProgram>
  rent?: Address<TAccountRent>
  name: AddPoolInstructionDataArgs['name']
  limit: AddPoolInstructionDataArgs['limit']
  fees: AddPoolInstructionDataArgs['fees']
  maxRequestExecutionSec: AddPoolInstructionDataArgs['maxRequestExecutionSec']
}

export function getAddPoolInstruction<
  TAccountAdmin extends string,
  TAccountTransferAuthority extends string,
  TAccountPerpetuals extends string,
  TAccountPool extends string,
  TAccountLpTokenMint extends string,
  TAccountSystemProgram extends string,
  TAccountTokenProgram extends string,
  TAccountRent extends string,
  TProgramAddress extends Address = typeof PERPETUALS_PROGRAM_ADDRESS,
>(
  input: AddPoolInput<
    TAccountAdmin,
    TAccountTransferAuthority,
    TAccountPerpetuals,
    TAccountPool,
    TAccountLpTokenMint,
    TAccountSystemProgram,
    TAccountTokenProgram,
    TAccountRent
  >,
  config?: { programAddress?: TProgramAddress }
): AddPoolInstruction<
  TProgramAddress,
  TAccountAdmin,
  TAccountTransferAuthority,
  TAccountPerpetuals,
  TAccountPool,
  TAccountLpTokenMint,
  TAccountSystemProgram,
  TAccountTokenProgram,
  TAccountRent
> {
  // Program address.
  const programAddress = config?.programAddress ?? PERPETUALS_PROGRAM_ADDRESS

  // Original accounts.
  const originalAccounts = {
    admin: { value: input.admin ?? null, isWritable: true },
    transferAuthority: {
      value: input.transferAuthority ?? null,
      isWritable: false,
    },
    perpetuals: { value: input.perpetuals ?? null, isWritable: true },
    pool: { value: input.pool ?? null, isWritable: true },
    lpTokenMint: { value: input.lpTokenMint ?? null, isWritable: true },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
    tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
    rent: { value: input.rent ?? null, isWritable: false },
  }
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >

  // Original args.
  const args = { ...input }

  // Resolve default values.
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>
  }
  if (!accounts.tokenProgram.value) {
    accounts.tokenProgram.value =
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' as Address<'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'>
  }
  if (!accounts.rent.value) {
    accounts.rent.value =
      'SysvarRent111111111111111111111111111111111' as Address<'SysvarRent111111111111111111111111111111111'>
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId')
  const instruction = {
    accounts: [
      getAccountMeta(accounts.admin),
      getAccountMeta(accounts.transferAuthority),
      getAccountMeta(accounts.perpetuals),
      getAccountMeta(accounts.pool),
      getAccountMeta(accounts.lpTokenMint),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.tokenProgram),
      getAccountMeta(accounts.rent),
    ],
    programAddress,
    data: getAddPoolInstructionDataEncoder().encode(
      args as AddPoolInstructionDataArgs
    ),
  } as AddPoolInstruction<
    TProgramAddress,
    TAccountAdmin,
    TAccountTransferAuthority,
    TAccountPerpetuals,
    TAccountPool,
    TAccountLpTokenMint,
    TAccountSystemProgram,
    TAccountTokenProgram,
    TAccountRent
  >

  return instruction
}

export type ParsedAddPoolInstruction<
  TProgram extends string = typeof PERPETUALS_PROGRAM_ADDRESS,
  TAccountMetas extends readonly AccountMeta[] = readonly AccountMeta[],
> = {
  programAddress: Address<TProgram>
  accounts: {
    admin: TAccountMetas[0]
    transferAuthority: TAccountMetas[1]
    perpetuals: TAccountMetas[2]
    pool: TAccountMetas[3]
    lpTokenMint: TAccountMetas[4]
    systemProgram: TAccountMetas[5]
    tokenProgram: TAccountMetas[6]
    rent: TAccountMetas[7]
  }
  data: AddPoolInstructionData
}

export function parseAddPoolInstruction<
  TProgram extends string,
  TAccountMetas extends readonly AccountMeta[],
>(
  instruction: Instruction<TProgram> &
    InstructionWithAccounts<TAccountMetas> &
    InstructionWithData<ReadonlyUint8Array>
): ParsedAddPoolInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 8) {
    // TODO: Coded error.
    throw new Error('Not enough accounts')
  }
  let accountIndex = 0
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!
    accountIndex += 1
    return accountMeta
  }
  return {
    programAddress: instruction.programAddress,
    accounts: {
      admin: getNextAccount(),
      transferAuthority: getNextAccount(),
      perpetuals: getNextAccount(),
      pool: getNextAccount(),
      lpTokenMint: getNextAccount(),
      systemProgram: getNextAccount(),
      tokenProgram: getNextAccount(),
      rent: getNextAccount(),
    },
    data: getAddPoolInstructionDataDecoder().decode(instruction.data),
  }
}
