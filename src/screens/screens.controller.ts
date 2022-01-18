import { Controller, UseGuards } from '@nestjs/common';
import { ScreensService } from './screens.service';
import { JwtAuthGuard } from '../users/guards/jwt-auth.guard';
import { Crud, CrudAuth } from '@nestjsx/crud';
import { Screen } from './entities/screen.entity';
import { CreateScreenDto } from './dto/create-screen.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateScreenDto } from './dto/update-screen.dto';
import { IsBodyEventOwnerGuard } from "./is-body-event-owner.guard";

@UseGuards(JwtAuthGuard)
@ApiTags('Screens')
@ApiBearerAuth()
@Controller('events/:eventId/screens')
@Crud({
  model: {
    type: Screen,
  },
  dto: {
    create: CreateScreenDto,
    update: UpdateScreenDto,
  },
  params: {
    eventId: {
      type: 'number',
      primary: false,
      field: 'eventId',
    },
  },
  query: {
    join: {
      event: {
        eager: true,
        select: false,
        required: true,
      },
    },
  },
  routes: {
    createOneBase: {
      decorators: [UseGuards(IsBodyEventOwnerGuard)],
    },
  },
})
@CrudAuth({
  property: 'user',
  filter: (user: RequestUserDto) => ({
    'event.ownerId': user.id,
  }),
})
export class ScreensController {
  constructor(public service: ScreensService) {}
}
