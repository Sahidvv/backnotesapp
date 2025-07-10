import { NotesService } from './notes.service';
import { Note } from './note.entity';
export declare class NotesController {
    private readonly notesService;
    constructor(notesService: NotesService);
    createNote(note: Partial<Note>): Promise<Note>;
    toggleArchive(id: string): Promise<Note>;
    updateNote(id: string, body: Partial<Note>): Promise<Note>;
    deleteNote(id: string): Promise<import("typeorm").DeleteResult>;
    getNotes(archived: string, category: string): Promise<Note[]>;
    replaceNote(id: string, body: Partial<Note>): Promise<Note>;
    addCategories(id: string, body: {
        categories: string[];
    }): Promise<Note>;
}
