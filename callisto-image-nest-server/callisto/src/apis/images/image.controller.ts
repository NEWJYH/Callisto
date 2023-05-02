import { Controller, Get } from '@nestjs/common';
import { ImageService } from './image.service';
import { BucketService } from '../buckets/bucket.service';

@Controller('/images')
export class ImageController {
  constructor(
    private readonly imageService: ImageService, //
    private readonly bucketService: BucketService,
  ) {}

  @Get()
  getHello(): string {
    return this.imageService.sayHello();
  }
}
