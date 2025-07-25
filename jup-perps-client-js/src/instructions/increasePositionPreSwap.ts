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
  transformEncoder,
  type AccountMeta,
  type AccountSignerMeta,
  type Address,
  type FixedSizeCodec,
  type FixedSizeDecoder,
  type FixedSizeEncoder,
  type Instruction,
  type InstructionWithAccounts,
  type InstructionWithData,
  type ReadonlyAccount,
  type ReadonlySignerAccount,
  type ReadonlyUint8Array,
  type TransactionSigner,
  type WritableAccount,
} from '@solana/kit'
import { PERPETUALS_PROGRAM_ADDRESS } from '../programs'
import { getAccountMetaFactory, type ResolvedAccount } from '../shared'

export const INCREASE_POSITION_PRE_SWAP_DISCRIMINATOR = new Uint8Array([
  26, 136, 225, 217, 22, 21, 83, 20,
])

export function getIncreasePositionPreSwapDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    INCREASE_POSITION_PRE_SWAP_DISCRIMINATOR
  )
}

export type IncreasePositionPreSwapInstruction<
  TProgram extends string = typeof PERPETUALS_PROGRAM_ADDRESS,
  TAccountKeeper extends string | AccountMeta<string> = string,
  TAccountKeeperAta extends string | AccountMeta<string> = string,
  TAccountPositionRequest extends string | AccountMeta<string> = string,
  TAccountPositionRequestAta extends string | AccountMeta<string> = string,
  TAccountPosition extends string | AccountMeta<string> = string,
  TAccountCollateralCustody extends string | AccountMeta<string> = string,
  TAccountCollateralCustodyTokenAccount extends
    | string
    | AccountMeta<string> = string,
  TAccountInstruction extends string | AccountMeta<string> = string,
  TAccountTokenProgram extends
    | string
    | AccountMeta<string> = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  TAccountEventAuthority extends string | AccountMeta<string> = string,
  TAccountProgram extends string | AccountMeta<string> = string,
  TRemainingAccounts extends readonly AccountMeta<string>[] = [],
> = Instruction<TProgram> &
  InstructionWithData<ReadonlyUint8Array> &
  InstructionWithAccounts<
    [
      TAccountKeeper extends string
        ? ReadonlySignerAccount<TAccountKeeper> &
            AccountSignerMeta<TAccountKeeper>
        : TAccountKeeper,
      TAccountKeeperAta extends string
        ? WritableAccount<TAccountKeeperAta>
        : TAccountKeeperAta,
      TAccountPositionRequest extends string
        ? WritableAccount<TAccountPositionRequest>
        : TAccountPositionRequest,
      TAccountPositionRequestAta extends string
        ? WritableAccount<TAccountPositionRequestAta>
        : TAccountPositionRequestAta,
      TAccountPosition extends string
        ? ReadonlyAccount<TAccountPosition>
        : TAccountPosition,
      TAccountCollateralCustody extends string
        ? ReadonlyAccount<TAccountCollateralCustody>
        : TAccountCollateralCustody,
      TAccountCollateralCustodyTokenAccount extends string
        ? ReadonlyAccount<TAccountCollateralCustodyTokenAccount>
        : TAccountCollateralCustodyTokenAccount,
      TAccountInstruction extends string
        ? ReadonlyAccount<TAccountInstruction>
        : TAccountInstruction,
      TAccountTokenProgram extends string
        ? ReadonlyAccount<TAccountTokenProgram>
        : TAccountTokenProgram,
      TAccountEventAuthority extends string
        ? ReadonlyAccount<TAccountEventAuthority>
        : TAccountEventAuthority,
      TAccountProgram extends string
        ? ReadonlyAccount<TAccountProgram>
        : TAccountProgram,
      ...TRemainingAccounts,
    ]
  >

export type IncreasePositionPreSwapInstructionData = {
  discriminator: ReadonlyUint8Array
}

export type IncreasePositionPreSwapInstructionDataArgs = {}

export function getIncreasePositionPreSwapInstructionDataEncoder(): FixedSizeEncoder<IncreasePositionPreSwapInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', fixEncoderSize(getBytesEncoder(), 8)]]),
    (value) => ({
      ...value,
      discriminator: INCREASE_POSITION_PRE_SWAP_DISCRIMINATOR,
    })
  )
}

export function getIncreasePositionPreSwapInstructionDataDecoder(): FixedSizeDecoder<IncreasePositionPreSwapInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
  ])
}

export function getIncreasePositionPreSwapInstructionDataCodec(): FixedSizeCodec<
  IncreasePositionPreSwapInstructionDataArgs,
  IncreasePositionPreSwapInstructionData
> {
  return combineCodec(
    getIncreasePositionPreSwapInstructionDataEncoder(),
    getIncreasePositionPreSwapInstructionDataDecoder()
  )
}

export type IncreasePositionPreSwapInput<
  TAccountKeeper extends string = string,
  TAccountKeeperAta extends string = string,
  TAccountPositionRequest extends string = string,
  TAccountPositionRequestAta extends string = string,
  TAccountPosition extends string = string,
  TAccountCollateralCustody extends string = string,
  TAccountCollateralCustodyTokenAccount extends string = string,
  TAccountInstruction extends string = string,
  TAccountTokenProgram extends string = string,
  TAccountEventAuthority extends string = string,
  TAccountProgram extends string = string,
> = {
  keeper: TransactionSigner<TAccountKeeper>
  keeperAta: Address<TAccountKeeperAta>
  positionRequest: Address<TAccountPositionRequest>
  positionRequestAta: Address<TAccountPositionRequestAta>
  position: Address<TAccountPosition>
  collateralCustody: Address<TAccountCollateralCustody>
  collateralCustodyTokenAccount: Address<TAccountCollateralCustodyTokenAccount>
  instruction: Address<TAccountInstruction>
  tokenProgram?: Address<TAccountTokenProgram>
  eventAuthority: Address<TAccountEventAuthority>
  program: Address<TAccountProgram>
}

export function getIncreasePositionPreSwapInstruction<
  TAccountKeeper extends string,
  TAccountKeeperAta extends string,
  TAccountPositionRequest extends string,
  TAccountPositionRequestAta extends string,
  TAccountPosition extends string,
  TAccountCollateralCustody extends string,
  TAccountCollateralCustodyTokenAccount extends string,
  TAccountInstruction extends string,
  TAccountTokenProgram extends string,
  TAccountEventAuthority extends string,
  TAccountProgram extends string,
  TProgramAddress extends Address = typeof PERPETUALS_PROGRAM_ADDRESS,
>(
  input: IncreasePositionPreSwapInput<
    TAccountKeeper,
    TAccountKeeperAta,
    TAccountPositionRequest,
    TAccountPositionRequestAta,
    TAccountPosition,
    TAccountCollateralCustody,
    TAccountCollateralCustodyTokenAccount,
    TAccountInstruction,
    TAccountTokenProgram,
    TAccountEventAuthority,
    TAccountProgram
  >,
  config?: { programAddress?: TProgramAddress }
): IncreasePositionPreSwapInstruction<
  TProgramAddress,
  TAccountKeeper,
  TAccountKeeperAta,
  TAccountPositionRequest,
  TAccountPositionRequestAta,
  TAccountPosition,
  TAccountCollateralCustody,
  TAccountCollateralCustodyTokenAccount,
  TAccountInstruction,
  TAccountTokenProgram,
  TAccountEventAuthority,
  TAccountProgram
> {
  // Program address.
  const programAddress = config?.programAddress ?? PERPETUALS_PROGRAM_ADDRESS

  // Original accounts.
  const originalAccounts = {
    keeper: { value: input.keeper ?? null, isWritable: false },
    keeperAta: { value: input.keeperAta ?? null, isWritable: true },
    positionRequest: { value: input.positionRequest ?? null, isWritable: true },
    positionRequestAta: {
      value: input.positionRequestAta ?? null,
      isWritable: true,
    },
    position: { value: input.position ?? null, isWritable: false },
    collateralCustody: {
      value: input.collateralCustody ?? null,
      isWritable: false,
    },
    collateralCustodyTokenAccount: {
      value: input.collateralCustodyTokenAccount ?? null,
      isWritable: false,
    },
    instruction: { value: input.instruction ?? null, isWritable: false },
    tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
    eventAuthority: { value: input.eventAuthority ?? null, isWritable: false },
    program: { value: input.program ?? null, isWritable: false },
  }
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >

  // Resolve default values.
  if (!accounts.tokenProgram.value) {
    accounts.tokenProgram.value =
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' as Address<'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'>
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId')
  const instruction = {
    accounts: [
      getAccountMeta(accounts.keeper),
      getAccountMeta(accounts.keeperAta),
      getAccountMeta(accounts.positionRequest),
      getAccountMeta(accounts.positionRequestAta),
      getAccountMeta(accounts.position),
      getAccountMeta(accounts.collateralCustody),
      getAccountMeta(accounts.collateralCustodyTokenAccount),
      getAccountMeta(accounts.instruction),
      getAccountMeta(accounts.tokenProgram),
      getAccountMeta(accounts.eventAuthority),
      getAccountMeta(accounts.program),
    ],
    programAddress,
    data: getIncreasePositionPreSwapInstructionDataEncoder().encode({}),
  } as IncreasePositionPreSwapInstruction<
    TProgramAddress,
    TAccountKeeper,
    TAccountKeeperAta,
    TAccountPositionRequest,
    TAccountPositionRequestAta,
    TAccountPosition,
    TAccountCollateralCustody,
    TAccountCollateralCustodyTokenAccount,
    TAccountInstruction,
    TAccountTokenProgram,
    TAccountEventAuthority,
    TAccountProgram
  >

  return instruction
}

export type ParsedIncreasePositionPreSwapInstruction<
  TProgram extends string = typeof PERPETUALS_PROGRAM_ADDRESS,
  TAccountMetas extends readonly AccountMeta[] = readonly AccountMeta[],
> = {
  programAddress: Address<TProgram>
  accounts: {
    keeper: TAccountMetas[0]
    keeperAta: TAccountMetas[1]
    positionRequest: TAccountMetas[2]
    positionRequestAta: TAccountMetas[3]
    position: TAccountMetas[4]
    collateralCustody: TAccountMetas[5]
    collateralCustodyTokenAccount: TAccountMetas[6]
    instruction: TAccountMetas[7]
    tokenProgram: TAccountMetas[8]
    eventAuthority: TAccountMetas[9]
    program: TAccountMetas[10]
  }
  data: IncreasePositionPreSwapInstructionData
}

export function parseIncreasePositionPreSwapInstruction<
  TProgram extends string,
  TAccountMetas extends readonly AccountMeta[],
>(
  instruction: Instruction<TProgram> &
    InstructionWithAccounts<TAccountMetas> &
    InstructionWithData<ReadonlyUint8Array>
): ParsedIncreasePositionPreSwapInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 11) {
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
      keeper: getNextAccount(),
      keeperAta: getNextAccount(),
      positionRequest: getNextAccount(),
      positionRequestAta: getNextAccount(),
      position: getNextAccount(),
      collateralCustody: getNextAccount(),
      collateralCustodyTokenAccount: getNextAccount(),
      instruction: getNextAccount(),
      tokenProgram: getNextAccount(),
      eventAuthority: getNextAccount(),
      program: getNextAccount(),
    },
    data: getIncreasePositionPreSwapInstructionDataDecoder().decode(
      instruction.data
    ),
  }
}
