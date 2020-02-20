import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToMany, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import User from './User';

@Entity('reply')
export default class Reply extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column('text', {
    nullable: false,
  })
  content: string;

  @ManyToOne(type => User, { onDelete: "SET NULL" })
  @JoinColumn({ name: 'fk_user_id' })
  user: User;

  @Column({
    length: 255,
    nullable: true,
  })
  fk_user_id: string;

  @ManyToOne(type => Comment, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'fk_comment_idx' })
  comment: Comment;

  @Column({
    nullable: false,
  })
  fk_comment_idx: number;

  @Column('timestampz')
  @CreateDateColumn()
  created_at: Date;

  @Column('timestamptz')
  @UpdateDateColumn()
  updated_at: Date;
}
