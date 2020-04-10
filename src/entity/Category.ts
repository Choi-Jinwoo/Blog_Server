import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn
} from 'typeorm';

@Entity('category')
export default class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({
    length: 255,
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
    default: true,
  })
  is_wrapper: boolean;

  @ManyToOne(type => Category, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'fk_category_idx' })
  wrapper_category: Category;

  @Column({
    nullable: true,
    default: null,
  })
  fk_category_idx: number;
}
