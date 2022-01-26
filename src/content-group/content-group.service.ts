import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ContentGroupDto } from './dto/response.dto';
import { ContentGroupRepository } from './content-group.repository';

@Injectable()
export class ContentGroupService extends TypeOrmCrudService<ContentGroupDto> {
  constructor(repo: ContentGroupRepository) {
    super(repo);
  }
}
