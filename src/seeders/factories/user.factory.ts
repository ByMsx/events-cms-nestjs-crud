import { User } from '../../users/entities/user.entity';
import { define } from 'typeorm-seeding';
import * as md5 from 'md5';

define(User, (faker) => {
  const user = new User();
  user.fullName = `${faker.name.firstName()} ${faker.name.lastName()}`;
  user.email = faker.internet.email();
  user.passwordHash = md5('123123123');
  return user;
});
