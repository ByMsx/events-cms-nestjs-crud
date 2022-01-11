import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PlaylistContentService } from '../playlist-content.service';

@Injectable()
export class IsNestedPlaylistOwnerGuard implements CanActivate {
  constructor(private service: PlaylistContentService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() === 'http') {
      const {
        user,
        params: { id },
      } = context.switchToHttp().getRequest();
      const playlistContent = await this.service.findOne(id, {
        relations: ['playlist'],
      });

      return playlistContent.playlist.ownerId === user.id;
    }

    throw new Error('Unimplemented');
  }
}
