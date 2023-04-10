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
  @PrimaryGeneratedColumn({ type: 'int' })
  user_class_id: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  user_class_name: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at!: Date | null;
}
