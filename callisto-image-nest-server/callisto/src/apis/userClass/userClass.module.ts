import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserClass } from './entities/userClass.entity';
import { UserClassController } from './userClass.controller';
import { UserClassService } from './userClass.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserClass, //
    ]),
  ],
  controllers: [UserClassController],
  providers: [UserClassService],
})
export class UserClassModule {}
