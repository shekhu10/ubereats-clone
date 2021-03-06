import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/entities/core.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from "@nestjs/common";
import { IsEmail, IsEnum } from "class-validator";

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
    @IsEmail()
    email: string;

    @Column()
    @Field(() => String)
    password: string;

    // @Column('int')
    
    // @Column({ type: 'enum', enum: UserRole })
    @Column('int')   // this is needed because our enum is stored in the form of number in our database
    @Field(() => UserRole)
    @IsEnum(UserRole)
    role: UserRole;


    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
        try{
            this.password = await bcrypt.hash(this.password, 10);
        }
        catch(e){
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

    async checkPassword(aPassword: string): Promise<boolean>{
        try {
            const ok = await bcrypt.compare(aPassword, this.password);
            return ok;

        }
        catch(e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }
}