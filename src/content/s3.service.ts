import { Injectable } from '@nestjs/common';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service {
  private readonly client = new S3Client({ region: 'eu-north-1' });
  private bucket = 'bymsx-testing-bucket';

  async getSignedUploadUrl(
    filename: string,
  ): Promise<{ url: string; filename: string }> {
    const newFilename = `${Math.random().toString().slice(2)}-${filename}`;
    const putFileCommand = new PutObjectCommand({
      Bucket: this.bucket,
      Key: newFilename,
    });

    const url = await getSignedUrl(this.client, putFileCommand, {
      expiresIn: 300,
    });

    return { url, filename: newFilename };
  }

  async getSignedDownloadFileHref(filename: string): Promise<string> {
    const getFileCommand = new GetObjectCommand({
      Bucket: this.bucket,
      Key: filename,
    });

    return getSignedUrl(this.client, getFileCommand, {
      expiresIn: 3600,
    });
  }

  async removeFile(filename: string): Promise<void> {
    const removeFileCommand = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: filename,
    });

    await this.client.send(removeFileCommand);
  }
}
