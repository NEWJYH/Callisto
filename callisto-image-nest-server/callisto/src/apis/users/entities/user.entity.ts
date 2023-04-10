import { Profile } from 'src/apis/profiles/entities/profile.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  password: string;

  @Column({ type: 'boolean', nullable: false })
  verified: boolean;

  @Column()
  @OneToOne(() => Profile)
  @JoinColumn({ name: 'profile_id' })
  profile_id: string;

  @Column()
  is_admin: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at!: Date | null;
}
