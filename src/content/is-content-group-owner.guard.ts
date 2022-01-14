import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ContentGroupRepository } from '../content-group/content-group.repository';

@Injectable()
export class IsContentGroupOwnerGuard implements CanActivate {
  constructor(private repo: ContentGroupRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() === 'http') {
      const {
        user,
        body: { contentGroupId },
      } = context.switchToHttp().getRequest();
      const contentGroup = await this.repo.findOne(contentGroupId);

      return contentGroup.ownerId === user.id;
    }

    throw new Error('Unimplemented');
  }
}
