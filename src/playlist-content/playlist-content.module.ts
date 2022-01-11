import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistContentRepository } from './playlist-content.repository';
import { IsOwnerOfNestedItemsGuard } from './guards/is-owner-of-nested-items.guard';
import { IsNestedPlaylistOwnerGuard } from './guards/is-nested-playlist-owner.guard';
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
    IsOwnerOfNestedItemsGuard,
    IsNestedPlaylistOwnerGuard,
    PlaylistContentService,
  ],
  controllers: [PlaylistContentController],
})
export class PlaylistContentModule {}
