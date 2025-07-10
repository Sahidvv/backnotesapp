import { Repository } from 'typeorm';
import { Note } from './note.entity';
export declare class NotesService {
    private notesRepository;
    updateNote(): void;
    constructor(notesRepository: Repository<Note>);
    create(note: Partial<Note>): Promise<Note>;
    findAll(): Promise<Note[]>;
    toggleArchive(id: number): Promise<Note>;
    update(id: number, updateData: Partial<Note>): Promise<Note>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
    findFiltered(archived?: boolean, category?: string): Promise<Note[]>;
    addCategories(id: number, categories: string[]): Promise<Note>;
}
