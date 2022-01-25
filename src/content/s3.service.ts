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
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY,
    },
  });

  private bucket = process.env.S3_BUCKET;

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
    const removeFileCommand = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: fileKey,
    });

    await this.client.send(removeFileCommand);
  }
}
