import { define, factory } from 'typeorm-seeding';
import { Content } from '../../content/entities/content.entity';
import { ContentType } from '../../content-group/dto/content-type.enum';
import { User } from '../../users/entities/user.entity';

define(Content, (faker) => {
  const contentTypes = [
    ContentType.IMAGE,
    ContentType.VIDEO,
    ContentType.AUDIO,
    ContentType.HTML,
  ];
  const content = new Content();
  content.type = faker.random.arrayElement(contentTypes);
  content.href = faker.internet.url();
  content.owner = factory(User)() as any;
  return content;
});
