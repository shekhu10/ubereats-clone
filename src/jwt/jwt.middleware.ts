import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from 'src/users/users.service';
import { JwtService } from './jwt.service';


@Injectable()
export class JwtMiddleware implements NestMiddleware {
    constructor (private readonly jwtService: JwtService,
        private readonly userService: UserService){}
        
    async use(req: Request, res: Response, next:NextFunction) {
        console.log(req.headers);
        if ("x-jwt" in req.headers){ // even if you pass capital in http header it automatically becomes small case
            const token = req.headers["x-jwt"];
            try{
                const decoded = this.jwtService.verify(token.toString());
                if (typeof decoded === 'object' && decoded.hasOwnProperty('id')){
                    // console.log(decoded['id']);
                
                    const user = await this.userService.findById(decoded['id']);
                    // console.log(user);
                    req['user'] = user;
                }        
            }
            catch(e){}
        }
        next();
    }
}
// we can not have a function middle ware as functional middleware can not be used with injection and repository and
// we are using repository to get the current logged in user.

// export function JwtMiddleware(req: Request, res: Response, next:NextFunction) {
//     console.log(req.headers);
//     next();
// }