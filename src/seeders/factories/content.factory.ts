import { define, factory } from 'typeorm-seeding';
import { Content } from '../../content/entities/content.entity';
import { ContentGroup } from '../../content-group/entities/content-group.entity';

define(Content, (faker) => {
  const content = new Content();
  const type = faker.system.fileType();

  content.group = factory(ContentGroup)() as any;
  content.fileKey = faker.system.fileName(faker.system.fileExt(type), type);
  content.extra = faker.system.mimeType();
  return content;
});
