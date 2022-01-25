import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ContentGroupRepository } from '../content-group/content-group.repository';

@Injectable()
export class IsContentGroupOwnerGuard implements CanActivate {
  constructor(private repo: ContentGroupRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() === 'http') {
      const { user, body, params } = context.switchToHttp().getRequest();

      let allowed = await this.checkGroupOwner(user.id, params.groupId);

      if (body?.groupId) {
        allowed &&= await this.checkGroupOwner(user.id, body.groupId);
      }

      return allowed;
    }

    throw new Error('Unimplemented');
  }

  private async checkGroupOwner(
    userId: number,
    groupId: number,
  ): Promise<boolean> {
    const contentGroup = await this.repo.findOne(groupId);
    return contentGroup.ownerId === userId;
  }
}
