import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { User } from "../entities/user.entity";


@InputType()
export class createAccountInput extends PickType(User, ['email', 'password', 'role']) {}



@ObjectType()
export class createAccountOutput extends CoreOutput {} 