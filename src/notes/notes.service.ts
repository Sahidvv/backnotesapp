// src/notes/notes.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';

@Injectable()
export class NotesService {
  updateNote() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  create(note: Partial<Note>) {
    const newNote = this.notesRepository.create(note);
    return this.notesRepository.save(newNote);
  }

  findAll() {
    return this.notesRepository.find({
      order: { id: 'ASC' },
    });
  }

  async toggleArchive(id: number) {
    const note = await this.notesRepository.findOneBy({ id });
    if (!note) {
      throw new Error('Note not found');
    }
    note.archived = !note.archived;
    return this.notesRepository.save(note);
  }

  async update(id: number, updateData: Partial<Note>) {
    const note = await this.notesRepository.findOneBy({ id });
    if (!note) throw new Error('Note not found');
    Object.assign(note, updateData);
    return this.notesRepository.save(note);
  }

  delete(id: number) {
    return this.notesRepository.delete(id);
  }
  async findFiltered(archived?: boolean, category?: string) {
    let query = this.notesRepository.createQueryBuilder('note');

    if (archived !== undefined) {
      query = query.where('note.archived = :archived', { archived });
    }

    query = query.orderBy('note.id', 'ASC'); // Ordenar por ID

    const notes = await query.getMany();

    if (category) {
      return notes.filter((note) => note.categories?.includes(category));
    }
    return notes;
  }

  async addCategories(id: number, categories: string[]) {
    const note = await this.notesRepository.findOneBy({ id });
    if (!note) {
      throw new Error('Note not found');
    }
    note.categories = categories;
    return this.notesRepository.save(note);
  }
}
