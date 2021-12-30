import { EntityRepository, Repository } from 'typeorm';
import { Screen } from './entities/screen.entity';

@EntityRepository(Screen)
export class ScreensRepository extends Repository<Screen> {}
