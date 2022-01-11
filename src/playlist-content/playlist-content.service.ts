import { Injectable } from '@nestjs/common';
import { PlaylistContentDto } from './dto/playlist-content.dto';
import { PlaylistContentRepository } from './playlist-content.repository';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { PlaylistsService } from '../playlists/playlists.service';
import { ContentService } from '../content/content.service';
import { PlaylistDto } from '../playlists/dto/playlist.dto';
import { ContentDto } from '../content/dto/content.dto';

@Injectable()
export class PlaylistContentService extends TypeOrmCrudService<PlaylistContentDto> {
  constructor(
    repo: PlaylistContentRepository,
    private playlistsService: PlaylistsService,
    private contentService: ContentService,
  ) {
    super(repo);
  }

  findPlaylist(playlistId: number): Promise<PlaylistDto> {
    return this.playlistsService.findOne(playlistId);
  }

  findContent(contentId: number): Promise<ContentDto> {
    return this.contentService.findOne(contentId);
  }
}
