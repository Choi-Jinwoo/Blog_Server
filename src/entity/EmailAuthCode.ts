import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
} from 'typeorm';

@Entity('email_auth_code')
export default class EmailAuthCode extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({
    length: 255,
    nullable: false,
  })
  email: string;
  
  @Column({
    length: 255,
    nullable: false,
  })
  code: string;

  /**
   * 이메일 인증 종류
   * 0 - 회원가입 인증
   * 1 - 구독 인증
   * 2 - 구독 해지 인증
   */
  @Column({
    nullable: false,
  })
  type: number;

  @Column('timestampz')
  @CreateDateColumn()
  created_at: Date;
}