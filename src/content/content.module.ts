import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentRepository } from './content.repository';
import { IsContentGroupOwnerGuard } from './is-content-group-owner.guard';
import { ContentGroupRepository } from '../content-group/content-group.repository';
import { S3Service } from './s3.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContentRepository, ContentGroupRepository]),
  ],
  providers: [IsContentGroupOwnerGuard, S3Service, ContentService],
  controllers: [ContentController],
  exports: [TypeOrmModule],
})
export class ContentModule {}
