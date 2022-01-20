import { define, factory } from 'typeorm-seeding';
import { Content } from '../../content/entities/content.entity';
import { ContentGroup } from '../../content-group/entities/content-group.entity';

define(Content, (faker) => {
  const content = new Content();
  content.group = factory(ContentGroup)() as any;
  content.filename = faker.system.fileName(
    'jpg',
    faker.system.commonFileType(),
  );
  content.extra = faker.system.mimeType();
  return content;
});
