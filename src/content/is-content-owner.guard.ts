import { Injectable } from '@nestjs/common';
import { IsOwnerGuard } from '../common/is-owner.guard';
import { Content } from './entities/content.entity';
import { ContentRepository } from './content.repository';

@Injectable()
export class IsContentOwnerGuard extends IsOwnerGuard<Content> {
  constructor(repo: ContentRepository) {
    super('id', repo);
  }
}
