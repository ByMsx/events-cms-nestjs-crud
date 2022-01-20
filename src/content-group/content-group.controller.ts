import { Crud, CrudAuth } from '@nestjsx/crud';
import { Controller, UseGuards } from '@nestjs/common';
import { ContentGroupService } from './content-group.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ContentGroupDto } from './dto/response.dto';
import { CreateContentGroupDto, UpdateContentGroupDto } from "./dto/request.dto";

@UseGuards(JwtAuthGuard)
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
  filter: (user) => ({ ownerId: user.id }),
  persist: (user) => ({ ownerId: user.id }),
})
@Controller('content-groups')
export class ContentGroupController {
  constructor(public service: ContentGroupService) {}
}
