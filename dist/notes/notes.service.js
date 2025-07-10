"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const note_entity_1 = require("./note.entity");
let NotesService = class NotesService {
    notesRepository;
    updateNote() {
        throw new Error('Method not implemented.');
    }
    constructor(notesRepository) {
        this.notesRepository = notesRepository;
    }
    create(note) {
        const newNote = this.notesRepository.create(note);
        return this.notesRepository.save(newNote);
    }
    findAll() {
        return this.notesRepository.find({
            order: { id: 'ASC' },
        });
    }
    async toggleArchive(id) {
        const note = await this.notesRepository.findOneBy({ id });
        if (!note) {
            throw new Error('Note not found');
        }
        note.archived = !note.archived;
        return this.notesRepository.save(note);
    }
    async update(id, updateData) {
        const note = await this.notesRepository.findOneBy({ id });
        if (!note)
            throw new Error('Note not found');
        Object.assign(note, updateData);
        return this.notesRepository.save(note);
    }
    delete(id) {
        return this.notesRepository.delete(id);
    }
    async findFiltered(archived, category) {
        let query = this.notesRepository.createQueryBuilder('note');
        if (archived !== undefined) {
            query = query.where('note.archived = :archived', { archived });
        }
        query = query.orderBy('note.id', 'ASC');
        const notes = await query.getMany();
        if (category) {
            return notes.filter((note) => note.categories?.includes(category));
        }
        return notes;
    }
    async addCategories(id, categories) {
        const note = await this.notesRepository.findOneBy({ id });
        if (!note) {
            throw new Error('Note not found');
        }
        note.categories = categories;
        return this.notesRepository.save(note);
    }
};
exports.NotesService = NotesService;
exports.NotesService = NotesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(note_entity_1.Note)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NotesService);
//# sourceMappingURL=notes.service.js.map