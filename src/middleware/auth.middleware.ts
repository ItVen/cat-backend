/**
 * @name auth 用户验证中间件
 * @author Aven
 * @Date: 2021-03-31
 * @LastEditors: Aven
 * @LastEditTime: 2021-03-31
 * */

import {
  NestMiddleware,
  HttpStatus,
  Injectable,
  HttpException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly indexerService: UserService) {}

  async use(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Error> {
    const authorization: string = req.headers.authorization;
    console.log('authorization', authorization);
    // Get token
    // const token = authorization.split(' ')[1];
    next();
    // if (!authorization) {
    //   // No token
    //   throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    // }
    // try {
    //   const decoded: any = verify(token, process.env.TOKEN_SECRET);
    //   const user = await this.indexerService.findById(decoded.id);
    //   req.user = user;
    //   next();
    // } catch (error) {
    //   res.json({
    //     success: false,
    //     statusCode: 401,
    //     message: 'Token expired',
    //     errors: [error.message],
    //   });
    //   // throw new HttpException(error.message, HttpStatus.UNAUTHORIZED)
    // }
  }
}
