import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { MutationOutput } from "src/common/dtos/output.dto";
import { User } from "../entities/user.entity";


@InputType()
export class loginInput extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class LoginOutput extends MutationOutput {
    @Field(() => String, {nullable: true})  // this means some times there will not be token passed in graphql output
    token: string;

}


