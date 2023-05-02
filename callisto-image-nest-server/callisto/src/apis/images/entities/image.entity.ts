import { ApiProperty } from '@nestjs/swagger';
import { Bucket } from 'src/apis/buckets/entities/bucket.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Image extends BaseEntity {
  @ApiProperty({ description: 'image_id', required: false })
  @PrimaryGeneratedColumn('uuid')
  image_id: string;

  @ApiProperty({ description: 'image_url' })
  @Column({ type: 'varchar', length: 200, nullable: false })
  url: string;

  @ApiProperty({ description: 'created_at', required: false })
  @CreateDateColumn()
  created_at!: Date;

  @ApiProperty({ description: 'updated_at', required: false })
  @UpdateDateColumn()
  updated_at!: Date;

  @ApiProperty({ description: 'deleted_at', required: false })
  @DeleteDateColumn({ nullable: true })
  deleted_at!: Date | null;

  @ApiProperty({ description: 'bucket_id', required: true })
  @ManyToOne(() => Bucket)
  @JoinColumn({ name: 'bucket_id' })
  bucket_id: Bucket;

  @ApiProperty({ description: 'profile_id', required: true })
  @Column({ type: 'uuid', nullable: false })
  profile_id: string;
}
