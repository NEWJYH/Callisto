import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bucket } from './entities/bucket.entity';

@Injectable()
export class BucketService {
  //
  constructor(
    @InjectRepository(Bucket)
    private readonly bucketRepository: Repository<Bucket>, //
  ) {}
  //
  async bucketExists(bucket_name: string): Promise<boolean> {
    const bucket = await this.bucketRepository.findOne({
      where: {
        bucket_name: bucket_name,
      },
    });
    //
    return !!bucket;
  }
  //
  async create(bucket_name: string): Promise<Bucket> {
    const bucket = new Bucket();
    bucket.bucket_name = bucket_name;
    return await this.bucketRepository.save(bucket);
  }
  //
  async findAll(): Promise<Bucket[]> {
    return await this.bucketRepository.find();
  }
  //
  async findOneById(id: number): Promise<Bucket> {
    const bucket = await this.bucketRepository.findOne({
      where: { bucket_id: id },
    });
    return bucket;
  }
  //
  async update(checkBucket: Bucket, bucketName: string): Promise<Bucket> {
    const bucket = await this.bucketRepository.save({
      ...checkBucket,
      bucket_name: bucketName,
    });
    return bucket;
  }
  //
  async delete(id: number): Promise<boolean> {
    // 소프트 삭제(TypeORM 제공) - softDelete
    const result = await this.bucketRepository.softDelete({
      bucket_id: id,
    });
    return result.affected ? true : false;
  }
}
