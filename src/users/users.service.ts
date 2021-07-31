import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BeforeUpdate, Db, Repository } from "typeorm";
import { createAccountInput } from "./dtos/create-account.dto";
import { loginInput } from "./dtos/login.dto";
import { User } from "./entities/user.entity";
import * as jwt from "jsonwebtoken";
import { JwtService } from "src/jwt/jwt.service";
import { EditProfileInput } from "./dtos/edit-profile.dto";
import { EntityListenerMetadata } from "typeorm/metadata/EntityListenerMetadata";
import { PassThrough } from "stream";
import { IsEmail } from "class-validator";


@Injectable()
export class UserService {
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
            const token = this.jwtService.sign(user.id);
            return {ok: true, token};
        }
        catch (error){
            return {
                ok: false,
                error,
            };
        }
    }

    async findById (id: number): Promise<User>{
        return this.users.findOne({ id });
    }

    async editProfile (userId: number, EditProfileInput: EditProfileInput){
        console.log(EditProfileInput);
        // return this.users.update(userId, {...EditProfileInput}); 
        // this is very fast, this just sends the query to the db
        // and does not checks that the row exists or not in the Db, hence it does not trigger
        // BeforeUpdate() in the Entities, so we need to use save, save() either inserts if the row does not exists else updates the row
        const user = await this.users.findOne(userId);
        const { email, password } = EditProfileInput;
        if (email){
            user.email = email;
        }
        if (password) {
            user.password = password;
        }
        return this.users.save(user);
    }

}