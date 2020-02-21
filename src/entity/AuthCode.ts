import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('auth_code')
export default class AuthCode extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({
    length: 255,
    nullable: false,
  })
  email: string;

  @Column({
    length: 45,
    nullable: false,
  })
  code: string;

  @Column('timestampz')
  @CreateDateColumn()
  created_at: Date;
}