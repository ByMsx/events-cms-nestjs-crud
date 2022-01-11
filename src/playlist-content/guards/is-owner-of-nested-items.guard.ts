import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PlaylistContentService } from '../playlist-content.service';

@Injectable()
export class IsOwnerOfNestedItemsGuard implements CanActivate {
  constructor(private service: PlaylistContentService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() === 'http') {
      const {
        body: { playlistId, contentId },
        user,
      } = context.switchToHttp().getRequest();

      let allowed = true;
      if (playlistId) {
        const playlist = await this.service.findPlaylist(+playlistId);
        allowed &&= playlist.ownerId === user.id;
      }

      if (contentId) {
        const content = await this.service.findContent(+contentId);
        allowed &&= content.ownerId === user.id;
      }

      return allowed;
    }
    throw new Error('Unimplemented');
  }
}
