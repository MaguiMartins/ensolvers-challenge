import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() body: any) {
    return this.notesService.create(body);
  }

  @Get()
  findAll(@Query('archived') archived: string) {
    const isArchived = archived === 'true';
    return this.notesService.findAll(isArchived);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.notesService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(+id);
  }
}