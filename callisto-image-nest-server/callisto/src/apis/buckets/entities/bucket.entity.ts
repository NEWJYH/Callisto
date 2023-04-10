import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Bucket extends BaseEntity {
  @ApiProperty({ description: 'bucket_id', required: false })
  @PrimaryGeneratedColumn({ type: 'int' })
  bucket_id: number;

  @ApiProperty({ description: 'bucket_name' })
  @Column({ type: 'varchar', length: 20, nullable: false })
  bucket_name: string;

  @ApiProperty({ description: 'created_at', required: false })
  @CreateDateColumn()
  created_at!: Date;

  @ApiProperty({ description: 'updated_at', required: false })
  @UpdateDateColumn()
  updated_at!: Date;

  @ApiProperty({ description: 'deleted_at', required: false })
  @DeleteDateColumn({ nullable: true })
  deleted_at!: Date | null;
}
