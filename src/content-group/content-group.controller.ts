import { Crud, CrudAuth } from '@nestjsx/crud';
import { Controller, UseGuards } from '@nestjs/common';
import { ContentGroupService } from './content-group.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ContentGroupDto } from './dto/response.dto';
import {
  CreateContentGroupDto,
  UpdateContentGroupDto,
} from './dto/request.dto';
import { RequestUserDto } from '../users/dto/request-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiTags('ContentGroup')
@ApiBearerAuth()
@Crud({
  model: {
    type: ContentGroupDto,
  },
  dto: {
    create: CreateContentGroupDto,
    update: UpdateContentGroupDto,
  },
  routes: {},
})
@CrudAuth({
  property: 'user',
  filter: (user: RequestUserDto) => ({ ownerId: user.id }),
  persist: (user: RequestUserDto) => ({ ownerId: user.id }),
})
@Controller('content-groups')
export class ContentGroupController {
  constructor(public service: ContentGroupService) {}
}
