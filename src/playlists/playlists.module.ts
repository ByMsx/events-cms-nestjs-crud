import { Module } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { PlaylistsController } from './playlists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistsRepository } from './playlists.repository';
import { IsPlaylistOwnerGuard } from './is-playlist-owner.guard';

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistsRepository])],
  providers: [IsPlaylistOwnerGuard, PlaylistsService],
  controllers: [PlaylistsController],
})
export class PlaylistsModule {}
