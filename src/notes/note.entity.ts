import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number = 0;
  @Column()
  title: string = '';

  @Column({ default: '' })
  content: string = '';

  @Column({ default: false })
  archived: boolean = false;
  @Column('text', { array: true, nullable: true, default: [] })
  categories?: string[] = [];
}
