/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  getI64Decoder,
  getI64Encoder,
  getStructDecoder,
  getStructEncoder,
  getU64Decoder,
  getU64Encoder,
  type FixedSizeCodec,
  type FixedSizeDecoder,
  type FixedSizeEncoder,
} from '@solana/kit'

export type PoolApr = {
  lastUpdated: bigint
  feeAprBps: bigint
  realizedFeeUsd: bigint
}

export type PoolAprArgs = {
  lastUpdated: number | bigint
  feeAprBps: number | bigint
  realizedFeeUsd: number | bigint
}

export function getPoolAprEncoder(): FixedSizeEncoder<PoolAprArgs> {
  return getStructEncoder([
    ['lastUpdated', getI64Encoder()],
    ['feeAprBps', getU64Encoder()],
    ['realizedFeeUsd', getU64Encoder()],
  ])
}

export function getPoolAprDecoder(): FixedSizeDecoder<PoolApr> {
  return getStructDecoder([
    ['lastUpdated', getI64Decoder()],
    ['feeAprBps', getU64Decoder()],
    ['realizedFeeUsd', getU64Decoder()],
  ])
}

export function getPoolAprCodec(): FixedSizeCodec<PoolAprArgs, PoolApr> {
  return combineCodec(getPoolAprEncoder(), getPoolAprDecoder())
}
