import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { createAccountInput } from "./dtos/create-account.dto";
import { User } from "./entities/user.entity";


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) 
        private readonly users: Repository<User>
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

}