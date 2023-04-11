import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ description: 'user_id', required: false })
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @ApiProperty({ description: 'email', required: true })
  @Column({ type: 'varchar', length: 2000, nullable: false })
  email: string;

  @ApiProperty({ description: 'password', required: true })
  @Column({ type: 'varchar', length: 2000, nullable: false })
  password: string;

  @ApiProperty({ description: 'password', required: false })
  @Column({ type: 'boolean', nullable: false, default: false })
  verified: boolean;

  @ApiProperty({ description: 'fk profile_id', required: false })
  @OneToOne(() => Profile)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @ApiProperty({ description: 'is_admin', required: false })
  @Column({ type: 'boolean', nullable: false, default: false })
  is_admin: boolean;

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
