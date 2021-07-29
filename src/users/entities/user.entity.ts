import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { number } from "joi";
import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// we need only 3 options for userrole
enum UserRole {
    Client,
    Owner,
    Delivery
}

registerEnumType(UserRole, {name: 'UserRole'});

@InputType({isAbstract: true})
@ObjectType()
@Entity()
export class User extends CoreEntity{

    @Column()
    @Field(() => String)
    email: string;

    @Column()
    @Field(() => String)
    password: string;

    // @Column('int')
    
    // @Column({ type: 'enum', enum: UserRole })
    @Column('int')   // this is needed because our enum is stored in the form of number in our database
    @Field(() => UserRole)
    role: UserRole;
}