import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsRepository } from './events.repository';
import { IsEventOwnerGuard } from './is-event-owner.guard';

@Module({
  imports: [TypeOrmModule.forFeature([EventsRepository])],
  providers: [IsEventOwnerGuard, EventsService],
  controllers: [EventsController],
})
export class EventsModule {}
