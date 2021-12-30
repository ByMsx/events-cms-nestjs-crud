import { EntityRepository, Repository } from 'typeorm';
import { Content } from './entities/content.entity';

@EntityRepository(Content)
export class ContentRepository extends Repository<Content> {}
