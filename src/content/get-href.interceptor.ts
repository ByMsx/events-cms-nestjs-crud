import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateContentDto } from './dto/request.dto';
import { S3Service } from './s3.service';

@Injectable()
export class GetHrefInterceptor implements NestInterceptor {
  constructor(private srv: S3Service) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    if (context.getType() === 'http') {
      const httpCtx = context.switchToHttp();
      const body = httpCtx.getRequest().body as CreateContentDto;

      body.href = this.srv.getFileHref(body.fileKey);

      return next.handle();
    }

    throw new Error('Unimplemented');
  }
}
