import { ApiProperty } from '@nestjs/swagger';
import { Job } from 'src/apis/jobs/entities/job.entity';
import { UserClass } from 'src/apis/userClass/entities/userClass.entity';
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
export class Profile extends BaseEntity {
  @ApiProperty({ description: 'profile_id', required: false })
  @PrimaryGeneratedColumn('uuid')
  profile_id: string;

  @ApiProperty({ description: 'nick_name', required: true })
  @Column({ type: 'varchar', length: 30, nullable: false })
  nick_name: string;

  @ApiProperty({ description: 'FK user_class_id', required: true })
  @ManyToOne(() => UserClass, { nullable: false })
  @JoinColumn({ name: 'user_class_id' })
  user_class_id: number;

  @ApiProperty({ description: 'FK job_id', required: false })
  @ManyToOne(() => Job, { nullable: true })
  @JoinColumn({ name: 'job_id' })
  job_id: number;

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
