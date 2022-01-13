import { Event } from '../../events/entities/event.entity';
import { define, factory } from 'typeorm-seeding';
import { User } from '../../users/entities/user.entity';

define(Event, (faker) => {
  const event = new Event();
  event.owner = factory(User)() as any;
  event.title = faker.random.words(2).slice(0, 31);
  event.datetime = faker.date.future();
  return event;
});
