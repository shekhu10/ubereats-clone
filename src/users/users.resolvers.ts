import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { AuthGuard } from "src/auth/auth.guard";
import { createAccountInput, createAccountOutput } from "./dtos/create-account.dto";
import { loginInput, LoginOutput } from "./dtos/login.dto";
import { User } from "./entities/user.entity";
import { UserService } from "./users.service";


@Resolver(() => Boolean)
export class UserResolver {

    constructor(private readonly usersService: UserService){}

    @Query(() => Boolean)
    hi() {
        return true;
    }

    @Mutation(returns => createAccountOutput)
    async createAccount(@Args("input") createAccountInput: createAccountInput): Promise<createAccountOutput>{
        try {
            const {ok, error} = await this.usersService.createAccount(createAccountInput);
            return {
                ok,
                error
            }
        }
        catch(e) {
            return ({
                error: e,
                ok: false
            })
        }
    }

    @Query(() => User)
    @UseGuards(AuthGuard)
    me( @AuthUser() authUser: User) {
        
        // console.log(authUser);
        return authUser;
    }

    @Mutation(() => LoginOutput)
    async login (@Args('input') loginInput: loginInput) {
        try {
            const {ok, error, token } = await this.usersService.login(loginInput);
            return {ok, error, token};
        }
        catch(e){
            return {
                ok: false,
                e
            }
        }
    }

}