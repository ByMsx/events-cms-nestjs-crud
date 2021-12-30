import { EntityRepository, Repository } from 'typeorm';
import { Playlist } from './entities/playlist.entity';

@EntityRepository(Playlist)
export class PlaylistsRepository extends Repository<Playlist> {}
