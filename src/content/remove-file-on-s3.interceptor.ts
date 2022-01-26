import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
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

      try {
        await this.s3.removeFile(fileKey);
        return next.handle();
      } catch (e) {
        context.switchToHttp().getResponse().status(500);

        return of({
          error: {
            message: 'Can not remove file from AWS S3',
            code: 'aws-s3/remove-file',
          },
        });
      }
    }

    throw new Error('Unimplemented');
  }
}
