import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IndexerEntity } from 'src/entity/indexer';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(IndexerEntity)
    private readonly indexerRepository: Repository<IndexerEntity>,
  ) {}
  async findById(id: number): Promise<IndexerEntity> {
    const indexer = await this.indexerRepository.findOne(id);
    if (!indexer) {
      throw new HttpException({ errors: { User: ' not found' } }, 401);
    }
    return null;
  }
  public generateJWT({ id }: IndexerEntity): string {
    return jwt.sign(
      {
        id,
      },
      process.env.TOKEN_SECRET,
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
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: 30 * 24 * 60 * 60,
      },
    );
  }
}
