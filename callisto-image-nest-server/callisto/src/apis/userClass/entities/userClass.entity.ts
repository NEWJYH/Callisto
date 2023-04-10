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
export class UserClass extends BaseEntity {
  @ApiProperty({ description: 'user_class_id', required: false })
  @PrimaryGeneratedColumn({ type: 'int' })
  user_class_id: number;

  @ApiProperty({ description: 'user_class_name', nullable: false })
  @Column({ type: 'varchar', length: 20, nullable: false })
  user_class_name: string;

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
