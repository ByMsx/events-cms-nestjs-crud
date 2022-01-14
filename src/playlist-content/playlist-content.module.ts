import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistContentRepository } from './playlist-content.repository';
import { IsOwnerOfItemsInRequestBodyGuard } from './guards/is-owner-of-items-in-request-body.guard';
import { IsPlaylistOwnerGuard } from './guards/is-playlist-owner.guard';
import { PlaylistContentService } from './playlist-content.service';
import { PlaylistContentController } from './playlist-content.controller';
import { PlaylistsModule } from '../playlists/playlists.module';
import { ContentModule } from '../content/content.module';

@Module({
  imports: [
    PlaylistsModule,
    ContentModule,
    TypeOrmModule.forFeature([PlaylistContentRepository]),
  ],
  providers: [
    IsOwnerOfItemsInRequestBodyGuard,
    IsPlaylistOwnerGuard,
    PlaylistContentService,
  ],
  controllers: [PlaylistContentController],
})
export class PlaylistContentModule {}
