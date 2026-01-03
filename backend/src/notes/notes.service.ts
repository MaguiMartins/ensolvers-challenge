import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity'; 

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  create(note: Partial<Note>) {
    return this.notesRepository.save(note);
  }

  findAll(archived: boolean = false) {
    return this.notesRepository.find({ 
      where: { archived }, 
      relations: ['categories'] 
    });
  }

  findOne(id: number) {
    return this.notesRepository.findOneBy({ id });
  }

  update(id: number, note: Partial<Note>) {
    return this.notesRepository.update(id, note);
  }

  remove(id: number) {
    return this.notesRepository.delete(id);
  }
}