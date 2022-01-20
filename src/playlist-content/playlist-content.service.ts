import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { PlaylistContentRepository } from './playlist-content.repository';
import { PlaylistContent } from './entities/playlist-content.entity';

@Injectable()
export class PlaylistContentService extends TypeOrmCrudService<PlaylistContent> {
  constructor(repo: PlaylistContentRepository) {
    super(repo);
  }
}
