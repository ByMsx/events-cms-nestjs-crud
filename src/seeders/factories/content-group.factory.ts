import { ContentGroup } from '../../content-group/entities/content-group.entity';
import { define, factory } from 'typeorm-seeding';
import { ContentType } from '../../content-group/dto/content-type.enum';
import { User } from '../../users/entities/user.entity';

define(ContentGroup, (faker) => {
  const contentTypes = [
    ContentType.IMAGE,
    ContentType.VIDEO,
    ContentType.AUDIO,
    ContentType.HTML,
  ];

  const group = new ContentGroup();
  group.type = faker.random.arrayElement(contentTypes);
  group.owner = factory(User)() as any;
  return group;
});
