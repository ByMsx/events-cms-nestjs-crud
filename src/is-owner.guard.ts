import { CanActivate, ExecutionContext } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { HaveOwner } from './have-owner.interface';

export abstract class IsOwnerGuard<T extends HaveOwner> implements CanActivate {
  protected constructor(
    protected fieldName: string,
    private service: TypeOrmCrudService<T>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() === 'http') {
      const {
        user,
        params: { [this.fieldName]: id },
      } = context.switchToHttp().getRequest();
      const instance = await this.service.findOne(id);
      return !instance || instance.ownerId === user.id;
    }

    throw new Error('Unimplemented');
  }
}
