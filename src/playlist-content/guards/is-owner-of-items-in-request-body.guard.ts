import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PlaylistsRepository } from '../../playlists/playlists.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentGroupRepository } from '../../content-group/content-group.repository';

@Injectable()
export class IsOwnerOfItemsInRequestBodyGuard implements CanActivate {
  constructor(
    @InjectRepository(PlaylistsRepository)
    private playlists: PlaylistsRepository,
    @InjectRepository(ContentGroupRepository)
    private contentGroup: ContentGroupRepository,
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
        const content = await this.contentGroup.findOne(+contentId);
        allowed &&= content.ownerId === user.id;
      }

      return allowed;
    }
    throw new Error('Unimplemented');
  }
}
