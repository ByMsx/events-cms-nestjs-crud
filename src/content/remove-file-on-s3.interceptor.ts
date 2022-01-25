import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { S3Service } from './s3.service';
import { ContentRepository } from './content.repository';

@Injectable()
export class RemoveFileOnS3 implements NestInterceptor {
  constructor(private s3: S3Service, private content: ContentRepository) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    if (context.getType() === 'http') {
      const { id: contentId } = context.switchToHttp().getRequest().params;
      const { fileKey } = await this.content.findOne(contentId);

      return next.handle().pipe(
        tap(async () => {
          await this.s3.removeFile(fileKey);
        }),
      );
    }

    throw new Error('Unimplemented');
  }
}
