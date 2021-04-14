import PWCore, { HashType, Script } from '@lay2/pw-core';

/*
 * @Author: Aven
 * @Date: 2021-04-14 14:34:27
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-14 15:16:39
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
      '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8';
    return new Script(codeHash, this.issuerLockHash, hashType);
  }
}
