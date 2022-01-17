import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudAuth } from '@nestjsx/crud';
import { CreateEventDto, UpdateEventDto } from './dto/request.dto';
import { JwtAuthGuard } from '../users/guards/jwt-auth.guard';
import { EventsService } from './events.service';
import { EventDto } from './dto/event.dto';
import { IsEventOwnerGuard } from './is-event-owner.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

const checkOwnerGuards = {
  decorators: [UseGuards(IsEventOwnerGuard)],
};

@UseGuards(JwtAuthGuard)
@ApiTags('Events')
@ApiBearerAuth()
@Crud({
  model: {
    type: EventDto,
  },
  dto: {
    create: CreateEventDto,
    update: UpdateEventDto,
  },
  validation: {
    transform: true,
  },
  routes: {
    updateOneBase: checkOwnerGuards,
    deleteOneBase: checkOwnerGuards,
    replaceOneBase: checkOwnerGuards,
  },
})
@CrudAuth({
  property: 'user',
  filter: (user) => ({ ownerId: user.id }),
  persist: (user) => ({ ownerId: user.id }),
})
@Controller('events')
export class EventsController {
  constructor(public service: EventsService) {}
}
