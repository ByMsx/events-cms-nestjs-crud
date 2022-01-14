import { Injectable } from '@nestjs/common';
import { PlaylistContentDto } from './dto/playlist-content.dto';
import { PlaylistContentRepository } from './playlist-content.repository';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class PlaylistContentService extends TypeOrmCrudService<PlaylistContentDto> {
  constructor(repo: PlaylistContentRepository) {
    super(repo);
  }
}
