/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  fixDecoderSize,
  fixEncoderSize,
  getBytesDecoder,
  getBytesEncoder,
  getStructDecoder,
  getStructEncoder,
  getU64Decoder,
  getU64Encoder,
  transformEncoder,
  type AccountMeta,
  type Address,
  type FixedSizeCodec,
  type FixedSizeDecoder,
  type FixedSizeEncoder,
  type Instruction,
  type InstructionWithAccounts,
  type InstructionWithData,
  type ReadonlyAccount,
  type ReadonlyUint8Array,
} from '@solana/kit'
import { PERPETUALS_PROGRAM_ADDRESS } from '../programs'
import { getAccountMetaFactory, type ResolvedAccount } from '../shared'

export const GET_REMOVE_LIQUIDITY_AMOUNT_AND_FEE2_DISCRIMINATOR =
  new Uint8Array([183, 59, 72, 110, 223, 243, 150, 142])

export function getGetRemoveLiquidityAmountAndFee2DiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    GET_REMOVE_LIQUIDITY_AMOUNT_AND_FEE2_DISCRIMINATOR
  )
}

export type GetRemoveLiquidityAmountAndFee2Instruction<
  TProgram extends string = typeof PERPETUALS_PROGRAM_ADDRESS,
  TAccountPerpetuals extends string | AccountMeta<string> = string,
  TAccountPool extends string | AccountMeta<string> = string,
  TAccountCustody extends string | AccountMeta<string> = string,
  TAccountCustodyDovesPriceAccount extends
    | string
    | AccountMeta<string> = string,
  TAccountCustodyPythnetPriceAccount extends
    | string
    | AccountMeta<string> = string,
  TAccountLpTokenMint extends string | AccountMeta<string> = string,
  TRemainingAccounts extends readonly AccountMeta<string>[] = [],
> = Instruction<TProgram> &
  InstructionWithData<ReadonlyUint8Array> &
  InstructionWithAccounts<
    [
      TAccountPerpetuals extends string
        ? ReadonlyAccount<TAccountPerpetuals>
        : TAccountPerpetuals,
      TAccountPool extends string
        ? ReadonlyAccount<TAccountPool>
        : TAccountPool,
      TAccountCustody extends string
        ? ReadonlyAccount<TAccountCustody>
        : TAccountCustody,
      TAccountCustodyDovesPriceAccount extends string
        ? ReadonlyAccount<TAccountCustodyDovesPriceAccount>
        : TAccountCustodyDovesPriceAccount,
      TAccountCustodyPythnetPriceAccount extends string
        ? ReadonlyAccount<TAccountCustodyPythnetPriceAccount>
        : TAccountCustodyPythnetPriceAccount,
      TAccountLpTokenMint extends string
        ? ReadonlyAccount<TAccountLpTokenMint>
        : TAccountLpTokenMint,
      ...TRemainingAccounts,
    ]
  >

export type GetRemoveLiquidityAmountAndFee2InstructionData = {
  discriminator: ReadonlyUint8Array
  lpAmountIn: bigint
}

export type GetRemoveLiquidityAmountAndFee2InstructionDataArgs = {
  lpAmountIn: number | bigint
}

export function getGetRemoveLiquidityAmountAndFee2InstructionDataEncoder(): FixedSizeEncoder<GetRemoveLiquidityAmountAndFee2InstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['lpAmountIn', getU64Encoder()],
    ]),
    (value) => ({
      ...value,
      discriminator: GET_REMOVE_LIQUIDITY_AMOUNT_AND_FEE2_DISCRIMINATOR,
    })
  )
}

export function getGetRemoveLiquidityAmountAndFee2InstructionDataDecoder(): FixedSizeDecoder<GetRemoveLiquidityAmountAndFee2InstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['lpAmountIn', getU64Decoder()],
  ])
}

export function getGetRemoveLiquidityAmountAndFee2InstructionDataCodec(): FixedSizeCodec<
  GetRemoveLiquidityAmountAndFee2InstructionDataArgs,
  GetRemoveLiquidityAmountAndFee2InstructionData
> {
  return combineCodec(
    getGetRemoveLiquidityAmountAndFee2InstructionDataEncoder(),
    getGetRemoveLiquidityAmountAndFee2InstructionDataDecoder()
  )
}

export type GetRemoveLiquidityAmountAndFee2Input<
  TAccountPerpetuals extends string = string,
  TAccountPool extends string = string,
  TAccountCustody extends string = string,
  TAccountCustodyDovesPriceAccount extends string = string,
  TAccountCustodyPythnetPriceAccount extends string = string,
  TAccountLpTokenMint extends string = string,
> = {
  perpetuals: Address<TAccountPerpetuals>
  pool: Address<TAccountPool>
  custody: Address<TAccountCustody>
  custodyDovesPriceAccount: Address<TAccountCustodyDovesPriceAccount>
  custodyPythnetPriceAccount: Address<TAccountCustodyPythnetPriceAccount>
  lpTokenMint: Address<TAccountLpTokenMint>
  lpAmountIn: GetRemoveLiquidityAmountAndFee2InstructionDataArgs['lpAmountIn']
}

export function getGetRemoveLiquidityAmountAndFee2Instruction<
  TAccountPerpetuals extends string,
  TAccountPool extends string,
  TAccountCustody extends string,
  TAccountCustodyDovesPriceAccount extends string,
  TAccountCustodyPythnetPriceAccount extends string,
  TAccountLpTokenMint extends string,
  TProgramAddress extends Address = typeof PERPETUALS_PROGRAM_ADDRESS,
>(
  input: GetRemoveLiquidityAmountAndFee2Input<
    TAccountPerpetuals,
    TAccountPool,
    TAccountCustody,
    TAccountCustodyDovesPriceAccount,
    TAccountCustodyPythnetPriceAccount,
    TAccountLpTokenMint
  >,
  config?: { programAddress?: TProgramAddress }
): GetRemoveLiquidityAmountAndFee2Instruction<
  TProgramAddress,
  TAccountPerpetuals,
  TAccountPool,
  TAccountCustody,
  TAccountCustodyDovesPriceAccount,
  TAccountCustodyPythnetPriceAccount,
  TAccountLpTokenMint
> {
  // Program address.
  const programAddress = config?.programAddress ?? PERPETUALS_PROGRAM_ADDRESS

  // Original accounts.
  const originalAccounts = {
    perpetuals: { value: input.perpetuals ?? null, isWritable: false },
    pool: { value: input.pool ?? null, isWritable: false },
    custody: { value: input.custody ?? null, isWritable: false },
    custodyDovesPriceAccount: {
      value: input.custodyDovesPriceAccount ?? null,
      isWritable: false,
    },
    custodyPythnetPriceAccount: {
      value: input.custodyPythnetPriceAccount ?? null,
      isWritable: false,
    },
    lpTokenMint: { value: input.lpTokenMint ?? null, isWritable: false },
  }
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >

  // Original args.
  const args = { ...input }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId')
  const instruction = {
    accounts: [
      getAccountMeta(accounts.perpetuals),
      getAccountMeta(accounts.pool),
      getAccountMeta(accounts.custody),
      getAccountMeta(accounts.custodyDovesPriceAccount),
      getAccountMeta(accounts.custodyPythnetPriceAccount),
      getAccountMeta(accounts.lpTokenMint),
    ],
    programAddress,
    data: getGetRemoveLiquidityAmountAndFee2InstructionDataEncoder().encode(
      args as GetRemoveLiquidityAmountAndFee2InstructionDataArgs
    ),
  } as GetRemoveLiquidityAmountAndFee2Instruction<
    TProgramAddress,
    TAccountPerpetuals,
    TAccountPool,
    TAccountCustody,
    TAccountCustodyDovesPriceAccount,
    TAccountCustodyPythnetPriceAccount,
    TAccountLpTokenMint
  >

  return instruction
}

export type ParsedGetRemoveLiquidityAmountAndFee2Instruction<
  TProgram extends string = typeof PERPETUALS_PROGRAM_ADDRESS,
  TAccountMetas extends readonly AccountMeta[] = readonly AccountMeta[],
> = {
  programAddress: Address<TProgram>
  accounts: {
    perpetuals: TAccountMetas[0]
    pool: TAccountMetas[1]
    custody: TAccountMetas[2]
    custodyDovesPriceAccount: TAccountMetas[3]
    custodyPythnetPriceAccount: TAccountMetas[4]
    lpTokenMint: TAccountMetas[5]
  }
  data: GetRemoveLiquidityAmountAndFee2InstructionData
}

export function parseGetRemoveLiquidityAmountAndFee2Instruction<
  TProgram extends string,
  TAccountMetas extends readonly AccountMeta[],
>(
  instruction: Instruction<TProgram> &
    InstructionWithAccounts<TAccountMetas> &
    InstructionWithData<ReadonlyUint8Array>
): ParsedGetRemoveLiquidityAmountAndFee2Instruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 6) {
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
      perpetuals: getNextAccount(),
      pool: getNextAccount(),
      custody: getNextAccount(),
      custodyDovesPriceAccount: getNextAccount(),
      custodyPythnetPriceAccount: getNextAccount(),
      lpTokenMint: getNextAccount(),
    },
    data: getGetRemoveLiquidityAmountAndFee2InstructionDataDecoder().decode(
      instruction.data
    ),
  }
}
