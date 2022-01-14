import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PlaylistsRepository } from '../../playlists/playlists.repository';
import { ContentRepository } from '../../content/content.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class IsOwnerOfItemsInRequestBodyGuard implements CanActivate {
  constructor(
    @InjectRepository(PlaylistsRepository)
    private playlists: PlaylistsRepository,
    @InjectRepository(ContentRepository)
    private content: ContentRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() === 'http') {
      const {
        body: { playlistId, contentId },
        user,
      } = context.switchToHttp().getRequest();

      let allowed = true;
      if (playlistId) {
        const playlist = await this.playlists.findOne(+playlistId);
        allowed &&= playlist.ownerId === user.id;
      }

      if (contentId) {
        const content = await this.content.findOne(+contentId);
        allowed &&= content.ownerId === user.id;
      }

      return allowed;
    }
    throw new Error('Unimplemented');
  }
}
