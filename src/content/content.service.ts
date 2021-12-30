import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Content } from './entities/content.entity';
import { ContentRepository } from './content.repository';

@Injectable()
export class ContentService extends TypeOrmCrudService<Content> {
  constructor(repo: ContentRepository) {
    super(repo);
  }
}
