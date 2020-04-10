import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToMany, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import User from './User';
import Post from './Post';

/**
 * Delete
 */
@Entity('comment')
export default class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column('text', {
    nullable: false,
  })
  content: string;

  @Column({
    nullable: false,
    default: false,
  })
  has_replies: boolean;

  @ManyToOne(type => User, { onDelete: "SET NULL" })
  @JoinColumn({ name: 'fk_user_id' })
  user: User;

  @Column({
    length: 255,
    nullable: true,
  })
  fk_user_id: string;

  @ManyToOne(type => Post, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'fk_post_idx' })
  post: Post;

  @Column({
    nullable: false,
  })
  fk_post_idx: number;

  @Column('timestampz')
  @CreateDateColumn()
  created_at: Date;

  @Column('timestamptz')
  @UpdateDateColumn()
  updated_at: Date;
}
