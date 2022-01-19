import { CanActivate, Injectable } from '@nestjs/common';
import { EventsRepository } from '../events/events.repository';
import { IsOwnerGuard } from '../is-owner.guard';
import { EventDto } from '../events/dto/event.dto';

@Injectable()
//REVIEW: по названию не понятно что проверяется. Может IsScreenEventOwnerGuard?
export class IsBodyEventOwnerGuard
  extends IsOwnerGuard<EventDto>
  implements CanActivate
{
  constructor(repo: EventsRepository) {
    super('eventId', repo);
  }
}
