import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { createAccountInput } from "./dtos/create-account.dto";
import { loginInput } from "./dtos/login.dto";
import { User } from "./entities/user.entity";
import * as jwt from "jsonwebtoken";
import { JwtService } from "src/jwt/jwt.service";


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) 
        private readonly users: Repository<User>,
        private readonly jwtService: JwtService
    ){}

    async createAccount({email, password, role}: createAccountInput): Promise<{ok: boolean, error?: string}>{
        // check new user
        // if new user, then create a user and hash the password
        try {
            const exists = await this.users.findOne({ email });      
            if (exists){
                return {ok: false, error: "there is a user with that email"};
            }
            await this.users.save(this.users.create({email, password, role}));
            return {ok: true};

        }
        catch(e) {
            // make error
            return {ok: false, error: "Couldn't create account"};
        }
    }

    async login({ email, password}: loginInput): Promise<{ ok: boolean, error?: string, token?: string }> {
        // find the user with email
        // check the password is corrent
        // make a JWT and give it to user
        try{
            const user = await this.users.findOne({ email });
            if (!user){
                return {
                    ok: false,
                    error: "user not found"
                }
            }
            const passwordCorrect = await user.checkPassword(password);
            if (!passwordCorrect){
                return {
                    ok: false,
                    error: 'wrong password'
                }
            }
            // const token = jwt.sign({id: user.id}, this.config.get('SECRET_KEY'));
            const token = this.jwtService.sign({id: user.id});
            return {ok: true, token};
        }
        catch (error){
            return {
                ok: false,
                error,
            };
        }
    }

}