import { Controller, UseGuards } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { JwtAuthGuard } from '../users/guards/jwt-auth.guard';
import { Crud, CrudAuth } from '@nestjsx/crud';
import {
  CreatePlaylistDto,
  UpdatePlaylistDto,
} from './dto/create-playlist.dto';
import { PlaylistDto } from './dto/playlist.dto';
import { IsPlaylistOwnerGuard } from './guards/is-playlist-owner.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

const defaultOwnerGuards = {
  decorators: [UseGuards(IsPlaylistOwnerGuard)],
};

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Playlists')
@Controller('playlists')
@Crud({
  model: {
    type: PlaylistDto,
  },
  dto: {
    create: CreatePlaylistDto,
    update: UpdatePlaylistDto,
  },
  query: {
    join: {
      contents: {
        eager: true,
      },
    },
  },
  routes: {
    updateOneBase: defaultOwnerGuards,
    deleteOneBase: defaultOwnerGuards,
    replaceOneBase: defaultOwnerGuards,
  },
})
@CrudAuth({
  property: 'user',
  filter: (user) => ({ ownerId: user.id }),
  persist: (user) => ({ ownerId: user.id }),
})
export class PlaylistsController {
  constructor(public service: PlaylistsService) {}
}
