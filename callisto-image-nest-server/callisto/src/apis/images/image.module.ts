import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BucketService } from '../buckets/bucket.service';
import { Bucket } from '../buckets/entities/bucket.entity';
import { Image } from './entities/image.entity';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';

@Module({
  imports: [TypeOrmModule.forFeature([Image, Bucket])],
  controllers: [ImageController],
  providers: [ImageService, BucketService],
})
export class ImageModule {}
