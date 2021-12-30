import { Injectable } from '@nestjs/common';
import { PlaylistsRepository } from './playlists.repository';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Playlist } from './entities/playlist.entity';

@Injectable()
export class PlaylistsService extends TypeOrmCrudService<Playlist> {
  constructor(repo: PlaylistsRepository) {
    super(repo);
  }
}
