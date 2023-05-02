import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  sayHello() {
    return 'Hello World';
  }

  async create({ url, bucket_id, profile_id }) {
    const image = new Image();
    image.url = url;
    image.bucket_id = bucket_id;
    image.profile_id = profile_id;
    return await this.imageRepository.save(image);
  }
}
