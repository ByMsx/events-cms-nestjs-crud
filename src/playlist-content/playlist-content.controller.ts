import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Crud, CrudAuth } from '@nestjsx/crud';
import { PlaylistContentDto } from './dto/playlist-content.dto';
import { CreatePlaylistContentDto } from './dto/create-playlist-content.dto';
import { UpdatePlaylistContentDto } from './dto/update-playlist-content.dto';
import { PlaylistContentService } from './playlist-content.service';
import { IsOwnerOfNestedItemsGuard } from './guards/is-owner-of-nested-items.guard';
import { IsNestedPlaylistOwnerGuard } from './guards/is-nested-playlist-owner.guard';

@UseGuards(JwtAuthGuard)
@Controller('playlists-contents')
@Crud({
  model: {
    type: PlaylistContentDto,
  },
  dto: {
    create: CreatePlaylistContentDto,
    update: UpdatePlaylistContentDto,
  },
  query: {
    join: {
      playlist: {
        eager: true,
        select: false,
        required: true,
      },
      content: {
        eager: true,
      },
    },
  },
  params: {
    playlistId: {
      type: 'number',
      field: 'playlistId',
    },
    id: {
      type: 'number',
      primary: true,
      field: 'id',
    },
  },
  routes: {
    createOneBase: {
      decorators: [UseGuards(IsOwnerOfNestedItemsGuard)],
    },
    updateOneBase: {
      decorators: [
        UseGuards(IsNestedPlaylistOwnerGuard, IsOwnerOfNestedItemsGuard), // two guards because PlaylistContent record can be stolen by setting only ContentId
      ],
    },
    deleteOneBase: {
      decorators: [UseGuards(IsNestedPlaylistOwnerGuard)],
    },
  },
})
@CrudAuth({
  property: 'user',
  filter: (user) => ({
    'playlist.ownerId': user.id,
    'content.ownerId': user.id,
  }),
  persist: (user) => ({
    'playlist.ownerId': user.id,
    'content.ownerId': user.id,
  }),
})
export class PlaylistContentController {
  constructor(public service: PlaylistContentService) {}
}
