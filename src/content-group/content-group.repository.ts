import { EntityRepository, Repository } from 'typeorm';
import { ContentGroup } from './entities/content-group.entity';

@EntityRepository(ContentGroup)
export class ContentGroupRepository extends Repository<ContentGroup> {}
