import { User } from '../../users/entities/user.entity';
import { define } from 'typeorm-seeding';

define(User, (faker) => {
  const user = new User();
  user.email = faker.internet.email();
  return user;
});
