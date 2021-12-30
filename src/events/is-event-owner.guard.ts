import { IsOwnerGuard } from '../is-owner.guard';
import { Injectable } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';

@Injectable()
export class IsEventOwnerGuard extends IsOwnerGuard<Event> {
  constructor(srv: EventsService) {
    super('id', srv);
  }
}
