import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BucketController } from './bucket.controller';
import { BucketService } from './bucket.service';
import { Bucket } from './entities/bucket.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Bucket, //
    ]),
  ],
  controllers: [BucketController],
  providers: [BucketService],
})
export class BucketModule {}
