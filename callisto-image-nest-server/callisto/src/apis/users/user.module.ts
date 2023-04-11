import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from '../jobs/entities/job.entity';
import { Profile } from '../profiles/entities/profile.entity';
import { UserClass } from '../userClass/entities/userClass.entity';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserClassService } from '../userClass/userClass.service';
import { JwtAccessStrategy } from 'src/commons/auth/jwt-access.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, //
      Profile,
      Job,
      UserClass,
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserService, //
    UserClassService,
    JwtAccessStrategy,
  ],
})
export class UserModule {}
