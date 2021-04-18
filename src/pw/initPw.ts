/*
 * @Author: Aven
 * @Date: 2021-04-14 10:40:37
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-18 22:42:37
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
import e from 'express';
import { IssuesCatDto } from 'src/user/dto';
import { CatCollector } from './catCollector';
import { IssuseCatBuilder } from './issuesCatBuilder';
import { SourlyCatType } from './SourlyCatType';

async function waitUntilCommitted(txHash: string, rpc: RPC, timeout = 180) {
  for (let index = 0; index < timeout; index++) {
    const data = await rpc.get_transaction(txHash);
    const status = data.tx_status.status;
    console.log(`tx ${txHash} is ${status}, waited for ${index} seconds`);
    console.log('asyncSleep 1000');
    await asyncSleep(1000);
    if (status === 'committed') {
      return;
    }
  }
  throw new Error(`tx ${txHash} not committed in ${timeout} seconds`);
}

export class InitPw {
  pw: PWCore;
  collector: CatCollector;
  provider: RawProvider;
  rpc: RPC;
  async getInit(address?: Address, usdt?: SourlyCatType) {
    if (this.pw) return this.pw;
    const CKB_URL = 'https://testnet.ckb.dev';
    const INDEXER_URL = 'https://testnet.ckb.dev/indexer';
    const privateKey =
      '0xe7b336b4c698ed048e550db6bab1c99fc3ed3784c8b1e139d4aaa204e87381aa';
    this.provider = new RawProvider(privateKey);
    this.collector = new CatCollector(INDEXER_URL);
    this.rpc = new RPC(CKB_URL);
    this.pw = await new PWCore(CKB_URL).init(this.provider, this.collector);
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
      data = cat.output_data;
      console.log(data.length, data, 'data');
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
    let tx;
    const fromBefore = await this.collector.getBalance(this.provider.address);
    const toBefore = await this.collector.getBalance(address);
    try {
      // const tx = await builder.build();
      // const signer = new DefaultSigner(PWCore.provider);
      // const data = await transformers.TransformTransaction(
      //   await signer.sign(tx),
      // );
      // console.log(data);
      // const tx_hash = await this.rpc.send_transaction(data);
      tx = await this.pw.sendTransaction(builder);
      console.log(tx, '-----tx');
    } catch (e) {
      console.log(e);
    }
    // tod
    // await waitUntilCommitted(tx, this.rpc);
    // const fromAfter = await this.collector.getBalance(this.provider.address);
    // const toAfter = await this.collector.getBalance(address);
    // console.log({ fromBefore, toBefore, fromAfter, toAfter });
    return tx;
  }
}
function asyncSleep(arg0: number) {
  throw new Error('Function not implemented.');
}
