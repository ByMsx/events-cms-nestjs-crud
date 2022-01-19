import { IsOwnerGuard } from '../common/is-owner.guard';
import { Injectable } from '@nestjs/common';
import { Event } from './entities/event.entity';
import { EventsRepository } from './events.repository';

@Injectable()
export class IsEventOwnerGuard extends IsOwnerGuard<Event> {
  constructor(repo: EventsRepository) {
    super('id', repo);
  }
}
