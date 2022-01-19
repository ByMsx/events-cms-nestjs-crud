import { CanActivate, Injectable } from '@nestjs/common';
import { EventsRepository } from '../events/events.repository';
import { IsOwnerGuard } from '../common/is-owner.guard';
import { EventDto } from '../events/dto/event.dto';

@Injectable()
export class IsScreenEventOwnerGuard
  extends IsOwnerGuard<EventDto>
  implements CanActivate
{
  constructor(repo: EventsRepository) {
    super('eventId', repo);
  }
}
