import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { createAccountInput, createAccountOutput } from "./dtos/create-account.dto";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";


@Resolver(() => Boolean)
export class UserResolver {

    constructor(private readonly usersService: UsersService){}

    @Query(() => Boolean)
    hi() {
        return true;
    }

    @Mutation(returns => createAccountOutput)
    createAccount(@Args("input") createAccountInput: createAccountInput){

    }

}