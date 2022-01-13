import { User } from '../../users/entities/user.entity';
import { define } from 'typeorm-seeding';
import * as md5 from 'md5';

define(User, (faker) => {
  const user = new User();
  user.email = `${faker.random
    .words(1)
    .slice(0, 15)}-${faker.random.number()}@t.ru`;
  user.passwordHash = md5('123123123');
  return user;
});
