import { Injectable } from '@nestjs/common';
import { IsOwnerGuard } from '../../common/is-owner.guard';
import { Playlist } from '../entities/playlist.entity';
import { PlaylistsRepository } from '../playlists.repository';

@Injectable()
export class IsPlaylistOwnerGuard extends IsOwnerGuard<Playlist> {
  constructor(repo: PlaylistsRepository) {
    super('id', repo);
  }
}
