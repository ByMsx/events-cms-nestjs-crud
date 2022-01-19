import { CanActivate, ExecutionContext } from '@nestjs/common';
import { HaveOwner } from './have-owner.interface';
import { Repository } from 'typeorm';

//REVIEW: такие вещи лучше в папку common положить
export abstract class IsOwnerGuard<T extends HaveOwner> implements CanActivate {
  protected constructor(
    protected fieldName: string,
    private repository: Repository<T>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() === 'http') {
      const {
        user,
        params: { [this.fieldName]: id },
      } = context.switchToHttp().getRequest();
      const instance = await this.repository.findOne(id);
      return !instance || instance.ownerId === user.id;
    }

    throw new Error('Unimplemented');
  }
}
