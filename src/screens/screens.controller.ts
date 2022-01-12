import { Controller, UseGuards } from '@nestjs/common';
import { ScreensService } from './screens.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Crud } from '@nestjsx/crud';
import { Screen } from './entities/screen.entity';
import { CreateScreenDto } from './dto/create-screen.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

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
  },
  params: {
    eventId: {
      type: 'number',
      primary: false,
      field: 'eventId',
    },
  },
  routes: {
    exclude: ['updateOneBase', 'replaceOneBase', 'recoverOneBase'],
  },
})
export class ScreensController {
  constructor(public service: ScreensService) {}
}
