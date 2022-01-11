import { Injectable } from '@nestjs/common';
import { IsOwnerGuard } from '../../is-owner.guard';
import { Playlist } from '../entities/playlist.entity';
import { PlaylistsService } from '../playlists.service';

@Injectable()
export class IsPlaylistOwnerGuard extends IsOwnerGuard<Playlist> {
  constructor(srv: PlaylistsService) {
    super('id', srv);
  }
}
