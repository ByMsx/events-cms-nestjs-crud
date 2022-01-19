import { Controller, UseGuards } from '@nestjs/common';
import { ContentService } from './content.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Crud, CrudAuth } from '@nestjsx/crud';
import { CreateContentDto, UpdateContentDto } from './dto/request.dto';
import { ContentDto } from './dto/response.dto';
import { IsContentOwnerGuard } from './is-content-owner.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestUserDto } from "../users/dto/request-user.dto";

@UseGuards(JwtAuthGuard)
@ApiTags('Content')
@ApiBearerAuth()
@Controller('content')
@Crud({
  model: {
    type: ContentDto,
  },
  dto: {
    create: CreateContentDto,
    update: UpdateContentDto,
  },
  routes: {
    replaceOneBase: {
      decorators: [UseGuards(IsContentOwnerGuard)],
    },
    updateOneBase: {
      decorators: [UseGuards(IsContentOwnerGuard)],
    },
    deleteOneBase: {
      decorators: [UseGuards(IsContentOwnerGuard)],
    },
  },
})
@CrudAuth({
  property: 'user',
  filter: (user: RequestUserDto) => ({ ownerId: user.id }),
  persist: (user: RequestUserDto) => ({
    ownerId: user.id,
    href: `random-string-${Math.random()}`,
  }),
})
export class ContentController {
  constructor(public service: ContentService) {}
}
