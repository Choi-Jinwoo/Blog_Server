import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity('subscribe')
export default class Subscribe extends BaseEntity {
  @PrimaryColumn({
    length: 255,
    nullable: false,
  })
  email: string;

  @Column('timestampz')
  @CreateDateColumn()
  created_at: Date;
}