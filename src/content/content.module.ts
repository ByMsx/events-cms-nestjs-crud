import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentRepository } from './content.repository';
import { IsContentGroupOwnerGuard } from './is-content-group-owner.guard';

@Module({
  imports: [TypeOrmModule.forFeature([ContentRepository])],
  providers: [IsContentGroupOwnerGuard, ContentService],
  controllers: [ContentController],
  exports: [TypeOrmModule],
})
export class ContentModule {}
