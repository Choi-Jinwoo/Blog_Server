import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';

@Entity('user')
export default class User extends BaseEntity {
  @PrimaryColumn({
    length: 255,
    nullable: false
  })
  id: string;

  @Column({
    length: 255,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    length: 255,
    nullable: false,
  })
  name: string;

  @Column({
    default: false,
    nullable: false,
  })
  is_admin: boolean;

  @Column({
    length: 1000,
    nullable: true,
  })
  profile_image: string;
}
