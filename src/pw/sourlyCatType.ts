import PWCore, { HashType, Script } from '@lay2/pw-core';

/*
 * @Author: Aven
 * @Date: 2021-04-14 14:34:27
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-14 15:16:27
 * @Description:
 */
export interface SudtInfo {
  symbol: string;
  decimals: number;
  name: string;
}
export class SourlyCatType {
  constructor(readonly issuerLockHash: string, readonly info?: SudtInfo) {}

  toTypeScript(): Script {
    const hashType = HashType.type;
    const codeHash =
      '0xbaf65c19f7009a6dfb941e66987e454a5c76b5fbfc0d5d7c3ad3d2e8cc7b7524';
    return new Script(codeHash, this.issuerLockHash, hashType);
  }
}
