import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScreensRepository } from './screens.repository';
import { ScreensService } from './screens.service';
import { ScreensController } from './screens.controller';
import { EventsModule } from '../events/events.module';
import { IsBodyEventOwnerGuard } from './is-body-event-owner.guard';

@Module({
  imports: [TypeOrmModule.forFeature([ScreensRepository]), EventsModule],
  providers: [ScreensService, IsBodyEventOwnerGuard],
  controllers: [ScreensController],
})
export class ScreensModule {}
