import { Controller, UseGuards } from '@nestjs/common';
import { ContentService } from './content.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Crud, CrudAuth } from '@nestjsx/crud';
import { CreateContentDto, UpdateContentDto } from './dto/request.dto';
import { ContentDto } from './dto/response.dto';
import { IsContentGroupOwnerGuard } from './is-content-group-owner.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestUserDto } from '../users/dto/request-user.dto';

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
  query: {
    join: {
      group: {
        eager: true,
        select: false,
      },
    },
  },
  routes: {
    replaceOneBase: {
      decorators: [UseGuards(IsContentGroupOwnerGuard)],
    },
    updateOneBase: {
      decorators: [UseGuards(IsContentGroupOwnerGuard)],
    },
    deleteOneBase: {
      decorators: [UseGuards(IsContentGroupOwnerGuard)],
    },
  },
})
@CrudAuth({
  property: 'user',
  filter: (user: RequestUserDto) => ({ 'group.ownerId': user.id }),
  persist: (user: RequestUserDto) => ({
    href: `random-string-${Math.random()}`,
  }),
})
export class ContentController {
  constructor(public service: ContentService) {}
}
