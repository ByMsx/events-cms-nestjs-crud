import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudAuth } from '@nestjsx/crud';
import { CreateEventDto } from './dto/create-event.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EventsService } from './events.service';
import { EventDto } from './dto/event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { IsEventOwnerGuard } from './is-event-owner.guard';

const checkOwnerGuards = {
  decorators: [UseGuards(IsEventOwnerGuard)],
};

@UseGuards(JwtAuthGuard)
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
  // TODO: specify 'user' type
  filter: (user) => ({ ownerId: user.id }),
  persist: (user) => ({ ownerId: user.id }),
})
@Controller('events')
export class EventsController {
  constructor(public service: EventsService) {}
}