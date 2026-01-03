import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesModule } from './notes/notes.module';
import { Note } from './notes/note.entity';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Note],
      synchronize: true, // Solo para desarrollo, crea las tablas automático
    }),
    NotesModule,
  ],
})
export class AppModule {}