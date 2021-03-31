import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransferEntity } from '../entity/transfer';

@Injectable()
export class TxService {
  //   constructor(
  //     @InjectRepository(TransferEntity)
  //     private readonly txRepository: Repository<TransferEntity>,
  //   ) {}
}
