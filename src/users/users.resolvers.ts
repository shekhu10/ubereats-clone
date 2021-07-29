import { Resolver, Query } from "@nestjs/graphql";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";


@Resolver(() => Boolean)
export class UserResolver {

    constructor(private readonly usersService: UsersService){}

    @Query(() => Boolean)
    hi() {
        return true;
    }

}