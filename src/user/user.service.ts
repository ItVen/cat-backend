/*
 * @Author: Aven
 * @Date: 2021-03-31 20:40:50
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-20 17:30:35
 * @Description:
 */
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IndexerEntity } from 'src/entity/indexer';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto, PutUserCellDto } from './dto/index';
import { CellService } from 'src/cell/cell.service';
import { verify } from 'jsonwebtoken';

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'cat-test';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(IndexerEntity)
    private readonly indexerRepository: Repository<IndexerEntity>,
    private readonly cellService: CellService,
  ) {}

  async findNameUsed(name: string): Promise<any> {
    console.log(name);
    const used = await this.cellService.findNameUsed(name);
    return { used };
  }
  async putMyCell(
    putUserCellDto: PutUserCellDto,
    user: IndexerEntity,
  ): Promise<IndexerEntity> {
    const users = await this.cellService.createOrUpdateCellData(
      putUserCellDto,
      user,
    );
    // todo 报错 更新保存方式
    user = await this.indexerRepository.save(users);
    // todo 判断是否移除cell
    return user;
  }
  async createMyIndexer({
    address,
    email,
    ethAddress,
    liveCells,
  }: CreateUserDto): Promise<any> {
    let where;
    if (email) where = { email };
    if (ethAddress) where = { ethAddress };
    const user = await this.indexerRepository.findOne({
      where,
    });
    if (user) return this.buildUserRO(user);
    const newUser = new IndexerEntity();
    newUser.address = address;
    if (email) newUser.email = email;
    newUser.ethAddress = ethAddress;
    const savedUser = await this.indexerRepository.save(newUser);
    if (liveCells == 0) {
      // todo 清除账户下的cell
      this.cellService.updateCellDeaed(savedUser.id);
    }
    return this.buildUserRO(savedUser);
  }

  async findById(id: number): Promise<IndexerEntity> {
    const indexer = await this.indexerRepository.findOne({
      // relations: ['cell'],
      where: { id },
    });
    if (!indexer) {
      throw new HttpException({ errors: { User: ' not found' } }, 401);
    }
    return indexer;
  }
  public generateJWT({ id, email, ethAddress }: IndexerEntity): string {
    return jwt.sign(
      {
        id,
        email,
        address: ethAddress,
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
        address: user.ethAddress,
      },
      TOKEN_SECRET,
      {
        expiresIn: 30 * 24 * 60 * 60,
      },
    );
  }
  private buildUserRO(user: IndexerEntity) {
    // todo 计算小鱼干
    const userRO = {
      token: this.generateJWT(user),
    };

    return userRO;
  }
  async findUserAllCat(
    address: string,
    token: string,
  ): Promise<Record<string, unknown>> {
    // todo
    let mine = false;
    let create_cat = 0;
    if (token) {
      try {
        const decoded: any = verify(token.split(' ')[1], TOKEN_SECRET);
        if (!address) address == decoded.address;
        if (decoded.address == address) mine = true;
      } catch (e) {
        console.log(e);
      }
    }
    const user = await this.indexerRepository.findOne({
      relations: ['cell'],
      where: { ethAddress: address },
    });
    if (mine && user) create_cat = user.create_cat;
    const data = {
      create_cat,
      mine,
      address,
      list: user.cell,
    };
    return data;
  }
}
