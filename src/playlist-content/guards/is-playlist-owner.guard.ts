import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PlaylistsRepository } from '../../playlists/playlists.repository';

@Injectable()
export class IsPlaylistOwnerGuard implements CanActivate {
  constructor(private playlists: PlaylistsRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() === 'http') {
      const {
        user,
        params: { id },
      } = context.switchToHttp().getRequest();
      const playlist = await this.playlists.findOne(id, {
        relations: ['playlist'],
      });

      return playlist.ownerId === user.id;
    }

    throw new Error('Unimplemented');
  }
}
