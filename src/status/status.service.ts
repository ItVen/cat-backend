import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BattleStatus } from 'src/entity/battleStatus';
import { NTFCat } from 'src/tx/dto/create-battle-transfer-data.dto';
import { Repository } from 'typeorm';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(BattleStatus)
    private readonly bsRepository: Repository<BattleStatus>,
  ) {}
  async createState(
    before: NTFCat,
    after: NTFCat,
    fishes?: string,
  ): Promise<BattleStatus> {
    const battle = new BattleStatus();
    battle.cat_name = before.name;
    battle.address = before.address;
    battle.before_fishes = before.fishes;
    battle.after_fishes = after.fishes;
    battle.before_hash = before.hash;
    battle.after_hash = after.hash;
    const data = await this.bsRepository.save(battle);
    return data;
  }
}
