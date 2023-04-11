import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessStrategy } from 'src/commons/auth/jwt-access.strategy';
import { Job } from '../jobs/entities/job.entity';
import { UserClass } from '../userClass/entities/userClass.entity';
import { Profile } from './entities/profile.entity';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Profile, //
      Job,
      UserClass,
    ]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService, JwtAccessStrategy],
})
export class ProfileModule {}
