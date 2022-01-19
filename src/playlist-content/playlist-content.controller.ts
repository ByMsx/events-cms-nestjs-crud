import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Crud, CrudAuth } from '@nestjsx/crud';
import { PlaylistContentDto } from './dto/playlist-content.dto';
import {
  CreatePlaylistContentDto,
  UpdatePlaylistContentDto,
} from './dto/request.dto';
import { PlaylistContentService } from './playlist-content.service';
import { IsOwnerOfItemsInRequestBodyGuard } from './guards/is-owner-of-items-in-request-body.guard';
import { IsPlaylistOwnerGuard } from './guards/is-playlist-owner.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestUserDto } from '../users/dto/request-user.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Playlists')
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
      decorators: [UseGuards(IsOwnerOfItemsInRequestBodyGuard)],
    },
    updateOneBase: {
      decorators: [
        UseGuards(IsPlaylistOwnerGuard, IsOwnerOfItemsInRequestBodyGuard), // two guards because PlaylistContent record can be stolen by setting only ContentId
      ],
    },
    deleteOneBase: {
      decorators: [UseGuards(IsPlaylistOwnerGuard)],
    },
  },
})
@CrudAuth({
  property: 'user',
  filter: (user: RequestUserDto) => ({
    'playlist.ownerId': user.id,
    'content.ownerId': user.id,
  }),
  persist: (user: RequestUserDto) => ({
    'playlist.ownerId': user.id,
    'content.ownerId': user.id,
  }),
})
export class PlaylistContentController {
  constructor(public service: PlaylistContentService) {}
}
