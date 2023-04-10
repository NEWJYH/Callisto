import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Column } from 'typeorm';

@Entity()
export class Job extends BaseEntity {
  @ApiProperty({ description: 'job_id', required: false })
  @PrimaryGeneratedColumn({ type: 'int' })
  job_id: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  job_name: string;

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
