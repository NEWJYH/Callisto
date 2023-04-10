import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../profiles/entities/profile.entity';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, //
      Profile,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
