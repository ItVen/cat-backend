/*
 * @Author: Aven
 * @Date: 2021-04-14 10:40:37
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-14 12:37:12
 * @Description:服务端发Cat的builder
 */
import PWCore, {
  Address,
  Amount,
  Builder,
  SUDT,
  Transaction,
  RawTransaction,
  Cell,
  AmountUnit,
  CellDep,
  DepType,
  OutPoint,
  BuilderOption,
} from '@lay2/pw-core';
import { CatCollector } from './catCollector';
import { SourlyCatType } from './SourlyCatType';

export class IssuseCatBuilder extends Builder {
  cat: string;
  constructor(
    private sudt: SourlyCatType,
    private address: Address,
    private amount: Amount,
    feeRate?: number,
    collector?: CatCollector,
    cat?: string,
    protected options: BuilderOption = {},
  ) {
    super(feeRate, collector, options.witnessArgs);
    this.cat = cat;
    console.log(cat, 'cat');
  }
  async build(): Promise<Transaction> {
    console.log(this.cat, 'build');
    if (
      this.sudt.issuerLockHash !==
      PWCore.provider.address.toLockScript().toHash()
    ) {
      console.error(`only issuer can call this function`);
      throw new Error(`only issuer can call this function`);
    }
    const inputCells = [];
    const outputCells = [];
    let inputCKBSum = Amount.ZERO;
    // todo
    const sudtCellCount = Number(this.amount.toString(AmountUnit.ckb));
    // cat最小可用空间+1ckb预留手续费
    const ckbAmount = new Amount(
      (sudtCellCount * 176).toString(),
      AmountUnit.ckb,
    );
    const neededAmount = ckbAmount;
    // .add(Builder.MIN_CHANGE)
    // .add(Builder.MIN_CHANGE);
    console.log(neededAmount);
    const unspentCells = await this.collector.collect(PWCore.provider.address, {
      neededAmount,
    });
    for (const cell of unspentCells) {
      inputCKBSum = inputCKBSum.add(cell.capacity);
      inputCells.push(cell);
    }
    if (inputCKBSum.lte(ckbAmount)) {
      console.error(
        `CKB amount is not meet,  expect ${ckbAmount.toString()}, but got ${inputCKBSum.toString()}`,
      );
      throw new Error(
        `CKB amount is not meet,  expect ${ckbAmount.toString()}, but got ${inputCKBSum.toString()}`,
      );
    }
    for (let i = 0; i < sudtCellCount; i++) {
      const sudtCell = new Cell(
        new Amount('176', AmountUnit.ckb),
        this.address.toLockScript(),
        this.sudt.toTypeScript(),
      );
      sudtCell.setSUDTAmount(new Amount('1', AmountUnit.shannon));
      console.log(sudtCell.setSUDTAmount);
      if (this.cat) {
        sudtCell.setHexData(this.cat);
        console.log(sudtCell.getHexData(), 'sudtCell');
        console.log(sudtCell.getHexData(), 'getHexsudtCell');
      }
      outputCells.push(sudtCell);
    }
    const changeCell = unspentCells[0].clone();
    changeCell.capacity = inputCKBSum.sub(ckbAmount);
    outputCells.push(changeCell);
    this.rectifyTx(inputCells, outputCells);
    changeCell.capacity = changeCell.capacity.sub(this.fee);
    // todo
    return this.rectifyTx(inputCells, outputCells);
  }

  private rectifyTx(inputCells: Cell[], outputCells: Cell[]) {
    const outPoint = new OutPoint(
      '0x297fb72de7f76ba0784e63dff941b01cbbb372a26c0786d2d511ae9709d8ca57',
      '0x0',
    );
    const catCelldep = new CellDep(DepType.code, outPoint);
    const sudtCellDeps = [PWCore.config.defaultLock.cellDep, catCelldep];
    const tx = new Transaction(
      new RawTransaction(inputCells, outputCells, sudtCellDeps),
      // [Builder.WITNESS_ARGS.Secp256k1]
      [this.witnessArgs],
    );
    // console.log(this.witnessArgs.lock, this.witnessArgs.lock.length);
    this.fee = Builder.calcFee(tx, this.feeRate);
    console.log(JSON.stringify(tx), 'rectifyTx');
    return tx;
  }
}
