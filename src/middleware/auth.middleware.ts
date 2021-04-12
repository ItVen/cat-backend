/*
 * @Author: Aven
 * @Date: 2021-03-31 17:47:55
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-12 22:57:41
 * @Description: auth 用户验证中间件
 */
import {
  NestMiddleware,
  HttpStatus,
  Injectable,
  HttpException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';
const TOKEN_SECRET = process.env.TOKEN_SECRET || 'cat-test';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly indexerService: UserService) {}
  async use(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Error> {
    const authorization: string = req.headers.authorization;

    // Get token
    if (!authorization) {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
    const token = authorization.split(' ')[1];
    try {
      const decoded: any = verify(token, TOKEN_SECRET);
      const user = await this.indexerService.findById(decoded.id);
      req.user = user;
      next();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
