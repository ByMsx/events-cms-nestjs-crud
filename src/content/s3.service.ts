import { Injectable } from '@nestjs/common';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service {
  private readonly client = new S3Client({
    region: 'eu-north-1',
    credentials: {
      accessKeyId: 'AKIAXWQH6OB5AZ4IGMI7',
      secretAccessKey: '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',
    },
  });
  private bucket = 'bymsx-testing-bucket';

  async getSignedUploadUrl(
    filename: string,
  ): Promise<{ url: string; fileKey: string }> {
    const fileKey = `${Math.random().toString().slice(2)}-${filename}`;
    const putFileCommand = new PutObjectCommand({
      Bucket: this.bucket,
      Key: fileKey,
      ACL: 'public-read',
    });

    const url = await getSignedUrl(this.client, putFileCommand, {
      expiresIn: 300,
    });

    return { url, fileKey };
  }

  getFileHref(fileKey: string): string {
    return `https://${this.bucket}.s3.amazonaws.com/${fileKey}`;
  }

  async removeFile(fileKey: string): Promise<void> {
    console.log('removeFile');
    const removeFileCommand = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: fileKey,
    });

    const r = await this.client.send(removeFileCommand);
    console.dir(r);
  }
}
