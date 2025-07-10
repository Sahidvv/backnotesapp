import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: '' })
  content: string;

  @Column({ default: false })
  archived: boolean;

  @Column('text', { array: true, nullable: true })
  categories?: string[];
}
