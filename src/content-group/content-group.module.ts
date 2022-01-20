import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentGroupRepository } from './content-group.repository';
import { ContentGroupController } from './content-group.controller';
import { ContentGroupService } from './content-group.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContentGroupRepository])],
  providers: [ContentGroupService],
  controllers: [ContentGroupController],
})
export class ContentGroupModule {}
