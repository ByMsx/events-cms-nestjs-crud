import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//REVIEW: такие вещи лучше в папку common положить
export const GetRequestUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    if (ctx.getType() === 'http') {
      return ctx.switchToHttp().getRequest().user;
    }

    throw new Error('Unimplemented');
  },
);
