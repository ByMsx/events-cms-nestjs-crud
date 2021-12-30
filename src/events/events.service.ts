import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Event } from './entities/event.entity';
import { EventsRepository } from './events.repository';

@Injectable()
export class EventsService extends TypeOrmCrudService<Event> {
  constructor(repo: EventsRepository) {
    super(repo);
  }
}
