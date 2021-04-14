/*
 * @Author: Aven
 * @Date: 2021-04-14 10:40:37
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-14 15:42:05
 * @Description:服务端发Cat的builder
 * ```jsx
address: ckt1qyqtvs9fmetyahkm4mjm4strw7yacr9avsrq4vua54

privatekey: 0xe7b336b4c698ed048e550db6bab1c99fc3ed3784c8b1e139d4aaa204e87381aa

lockScriptHash: 0x9ec9ae72e4579980e41554100f1219ff97599f8ab7e79c074b30f2fa241a790c

```
 */
import PWCore, {
  Address,
  Amount,
  SUDT,
  RawProvider,
  Builder,
  byteArrayToHex,
  DefaultSigner,
} from '@lay2/pw-core';
import { RPC, transformers } from 'ckb-js-toolkit';
import { IssuesCatDto } from 'src/user/dto';
import { CatCollector } from './catCollector';
import { IssuseCatBuilder } from './issuesCatBuilder';
import { SourlyCatType } from './SourlyCatType';

function setData(data: string, length?: number): string {
  console.log('data', data);
  data = data.trim();
  const bytes = [];
  for (let i = 0; i < length; i++) {
    if (data.charCodeAt(i)) {
      bytes.push(data.charCodeAt(i));
    } else {
      bytes.push(0);
    }
  }
  return bytes.join('');
}

export class InitPw {
  pw: PWCore;
  collector: CatCollector;
  rpc: RPC;
  async getInit(address?: Address, usdt?: SourlyCatType) {
    if (this.pw) return this.pw;
    const CKB_URL = 'https://testnet.ckb.dev';
    const INDEXER_URL = 'https://testnet.ckb.dev/indexer';
    const privateKey =
      '0xe7b336b4c698ed048e550db6bab1c99fc3ed3784c8b1e139d4aaa204e87381aa';
    const provider = new RawProvider(privateKey);
    this.collector = new CatCollector(INDEXER_URL);
    this.rpc = new RPC(CKB_URL);
    this.pw = await new PWCore(CKB_URL).init(provider, this.collector);
    return this.pw;
  }
  async sendTransaction(
    sudt: SUDT,
    address: Address,
    amount: Amount,
    cat: IssuesCatDto,
  ) {
    let data = '0x';
    if (cat) {
      data = '0x' + setData(cat.name, 32) + cat.hash + setData(cat.fishes, 8);
      console.log(data.length);
    }
    if (!this.pw) await this.getInit();
    const options = { witnessArgs: Builder.WITNESS_ARGS.RawSecp256k1 };
    const builder = new IssuseCatBuilder(
      sudt,
      address,
      amount,
      null,
      this.collector,
      data,
      options,
    );
    console.log(this.pw);
    let tx;
    try {
      const tx = await builder.build();
      console.log(tx);
      const signer = new DefaultSigner(PWCore.provider);
      console.log(signer);
      const data = await transformers.TransformTransaction(
        await signer.sign(tx),
      );
      console.log(data);
      const tx_hash = await this.rpc.send_transaction(data);
      // tx = await this.pw.sendTransaction(builder);
      console.log(tx_hash, '-----tx');
    } catch (e) {
      console.log(e);
    }
    return tx;
  }
}
