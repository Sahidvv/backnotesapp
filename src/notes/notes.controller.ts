// src/notes/notes.controller.ts

import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from './note.entity';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  createNote(@Body() note: Partial<Note>) {
    return this.notesService.create(note);
  }

  @Patch(':id/archive')
  toggleArchive(@Param('id') id: string) {
    return this.notesService.toggleArchive(Number(id));
  }

  // ✅ NUEVA RUTA: Editar nota
  @Patch(':id')
  async updateNote(@Param('id') id: string, @Body() body: Partial<Note>) {
    return this.notesService.update(Number(id), body);
  }

  // ✅ NUEVA RUTA: Eliminar nota
  @Delete(':id')
  deleteNote(@Param('id') id: string) {
    return this.notesService.delete(Number(id));
  }
  // Filtrar notas por archivado y/o categoría
  @Get()
  getNotes(
    @Query('archived') archived: string,
    @Query('category') category: string,
  ) {
    return this.notesService.findFiltered(
      archived !== undefined ? archived === 'true' : undefined,
      category,
    );
  }
  @Put(':id')
  async replaceNote(@Param('id') id: string, @Body() body: Partial<Note>) {
    return this.notesService.update(Number(id), body);
  }

  // Agregar categorías
  @Patch(':id/categories')
  addCategories(
    @Param('id') id: string,
    @Body() body: { categories: string[] },
  ) {
    return this.notesService.addCategories(+id, body.categories);
  }
}
