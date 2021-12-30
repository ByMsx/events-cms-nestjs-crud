import { EntityRepository, Repository } from 'typeorm';
import { Event } from './entities/event.entity';

@EntityRepository(Event)
export class EventsRepository extends Repository<Event> {}
