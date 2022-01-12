import { Controller, UseGuards } from '@nestjs/common';
import { ContentService } from './content.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Crud, CrudAuth } from '@nestjsx/crud';
import { CreateContentDto } from './dto/create-content.dto';
import { ContentDto } from './dto/content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { IsContentOwnerGuard } from './is-content-owner.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

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
  filter: (user) => ({ ownerId: user.id }),
  persist: (user) => ({
    ownerId: user.id,
    href: `random-string-${Math.random()}`,
  }),
})
export class ContentController {
  constructor(public service: ContentService) {}
}
