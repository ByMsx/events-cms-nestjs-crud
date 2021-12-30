import { Controller, UseGuards } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Crud, CrudAuth } from '@nestjsx/crud';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { PlaylistDto } from './dto/playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { IsPlaylistOwnerGuard } from './is-playlist-owner.guard';

const defaultOwnerGuards = {
  decorators: [UseGuards(IsPlaylistOwnerGuard)],
};

@UseGuards(JwtAuthGuard)
@Controller('playlists')
@Crud({
  model: {
    type: PlaylistDto,
  },
  dto: {
    create: CreatePlaylistDto,
    update: UpdatePlaylistDto,
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
