import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScreensRepository } from './screens.repository';
import { ScreensService } from './screens.service';
import { ScreensController } from './screens.controller';
import { EventsModule } from '../events/events.module';
import { IsScreenEventOwnerGuard } from './is-screen-event-owner-guard.service';

@Module({
  imports: [TypeOrmModule.forFeature([ScreensRepository]), EventsModule],
  providers: [ScreensService, IsScreenEventOwnerGuard],
  controllers: [ScreensController],
})
export class ScreensModule {}
