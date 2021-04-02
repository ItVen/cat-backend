/*
 * @Author: Aven
 * @Date: 2021-03-31 20:40:50
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-02 17:18:48
 * @Description:
 */
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IndexerEntity } from 'src/entity/indexer';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto, PutUserCellDto } from './dto/index';
import { CellService } from 'src/cell/cell.service';

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'cat-test';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(IndexerEntity)
    private readonly indexerRepository: Repository<IndexerEntity>,
    private readonly cellService: CellService,
  ) {}

  async findNameUsed(name: string): Promise<any> {
    const used = await this.cellService.findNameUsed(name);
    return { used };
  }
  async putMyCell(
    putUserCellDto: PutUserCellDto,
    user: IndexerEntity,
  ): Promise<IndexerEntity> {
    const cells = await this.cellService.createOrUpdateCellData(
      putUserCellDto,
      user,
    );
    user = await this.indexerRepository.save(cells);
    return user;
  }
  async createMyIndexer({ address, email }: CreateUserDto): Promise<any> {
    const user = await this.indexerRepository.findOne({
      relations: ['cell'],
      where: { email },
    });
    if (user) return this.buildUserRO(user);
    const newUser = new IndexerEntity();
    newUser.address = address;
    newUser.email = email;
    newUser.cell = [];
    const savedUser = await this.indexerRepository.save(newUser);
    return this.buildUserRO(savedUser);
  }

  async findById(id: number): Promise<IndexerEntity> {
    const indexer = await this.indexerRepository.findOne({
      relations: ['cell'],
      where: { id },
    });
    if (!indexer) {
      throw new HttpException({ errors: { User: ' not found' } }, 401);
    }
    return indexer;
  }
  public generateJWT({ id, email }: IndexerEntity): string {
    return jwt.sign(
      {
        id,
        email,
      },
      TOKEN_SECRET,
      {
        expiresIn: 1 * 24 * 60 * 60,
      },
    );
  }
  // 生成 refreshToken
  public generateRefreshToken(user: IndexerEntity): string {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      TOKEN_SECRET,
      {
        expiresIn: 30 * 24 * 60 * 60,
      },
    );
  }
  private buildUserRO(user: IndexerEntity) {
    // todo 计算小鱼干
    const cells = this.cellService.getFisherCount(user.cell);
    const userRO = {
      id: user.id,
      email: user.email,
      create_cat: user.create_cat,
      address: user.address,
      fishes: cells,
      token: this.generateJWT(user),
    };

    return userRO;
  }
}
