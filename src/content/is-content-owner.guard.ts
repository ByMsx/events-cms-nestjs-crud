import { Injectable } from '@nestjs/common';
import { IsOwnerGuard } from '../is-owner.guard';
import { Content } from './entities/content.entity';
import { ContentService } from './content.service';

@Injectable()
export class IsContentOwnerGuard extends IsOwnerGuard<Content> {
  constructor(srv: ContentService) {
    super('id', srv);
  }
}
