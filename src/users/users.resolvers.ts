import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql";
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
    me(
        @Context() context
    ) {
        // we are going to do, that if the user is logged in then give him data else error
        // note we get context from http header, so if http header does not have token we give error
        // currently we are having this on every resolver and we do not want to do this on every resolver
        // so the concept of guards come here
        if (!context.user) {
            return ;
        }
        else{
            return context.user;
        }

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