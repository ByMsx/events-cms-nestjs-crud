import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScreensRepository } from './screens.repository';
import { ScreensService } from './screens.service';
import { ScreensController } from './screens.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ScreensRepository])],
  providers: [ScreensService],
  controllers: [ScreensController],
})
export class ScreensModule {}
