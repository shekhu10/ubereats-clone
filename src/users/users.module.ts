import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserResolver } from './users.resolvers';
import { UsersService } from './users.service';

@Module({
    imports: [TypeOrmModule.forFeature([User]), ConfigService],
    providers: [UserResolver, UsersService],
})
export class UsersModule {}
