import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Screen } from './entities/screen.entity';
import { ScreensRepository } from './screens.repository';

@Injectable()
export class ScreensService extends TypeOrmCrudService<Screen> {
  constructor(repo: ScreensRepository) {
    super(repo);
  }
}
