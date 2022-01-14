import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentRepository } from './content.repository';
import { IsContentOwnerGuard } from './is-content-owner.guard';

@Module({
  imports: [TypeOrmModule.forFeature([ContentRepository])],
  providers: [IsContentOwnerGuard, ContentService],
  controllers: [ContentController],
  exports: [TypeOrmModule],
})
export class ContentModule {}
