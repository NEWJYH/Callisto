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
  @PrimaryGeneratedColumn('uuid')
  profile_id: string;

  @Column()
  nick_name: string;

  @ManyToOne(() => UserClass)
  @JoinColumn({ name: 'user_class_id' })
  user_class_id: number;

  @ManyToOne(() => Job)
  @JoinColumn({ name: 'job_id' })
  job_id: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at!: Date | null;
}
