import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export type Category = 'tech' | 'watches' | 'apps' | 'music' | 'dining';

@Entity('items')
export class Item {
  @PrimaryColumn('varchar')
  id!: string;

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }

  @Column('varchar')
  title!: string;

  @Column('varchar')
  category!: Category;

  @Column('text')
  description!: string;

  @Column('varchar', { nullable: true })
  imageUrl?: string;

  @Column('varchar', { nullable: true })
  externalLink?: string;

  @Column('float', { nullable: true })
  rating?: number;

  @Column('varchar', { default: '' })
  tags!: string;

  @Column('boolean', { default: false })
  featured!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
