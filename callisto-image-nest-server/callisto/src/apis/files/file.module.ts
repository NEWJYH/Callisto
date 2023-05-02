import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessStrategy } from 'src/commons/auth/jwt-access.strategy';
import { BucketService } from '../buckets/bucket.service';
import { Bucket } from '../buckets/entities/bucket.entity';
import { FileController } from './file.controller';
import { ImageService } from '../images/image.service';
import { FileService } from './file.service';
import { Image } from '../images/entities/image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Bucket, //
      Image,
    ]),
  ],
  controllers: [FileController],
  providers: [
    FileService, //
    BucketService, //
    ImageService,
    JwtAccessStrategy,
  ],
})
export class FileModule {}
