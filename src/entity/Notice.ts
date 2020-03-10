import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import User from './User';

@Entity('notice')
export default class Notice extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column('text')
  content: string;

  @ManyToOne(type => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'fk_user_id' })
  user: User;

  @Column({
    length: 255,
    nullable: true,
  })
  fk_user_id: string;

  @Column('timestampz')
  @CreateDateColumn()
  created_at: Date;
}