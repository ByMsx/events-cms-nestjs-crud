import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentGroupRepository } from './content-group.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ContentGroupRepository])],
})
export class ContentGroupModule {}
