import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class FileService {
  //
  async upload({ file, bucket_id }) {
    // 1. 버킷 아이디를 폴더명으로 사용 // 시점 시간과 파일 이름을 사용함
    const key = `${bucket_id}/${Date.now() + file.originalname}`;
    const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${key}`;

    AWS.config.update({
      region: process.env.AWS_BUCKET_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
      },
    });

    try {
      const upload = await new AWS.S3()
        .putObject({
          Key: key,
          Body: file.buffer,
          Bucket: process.env.AWS_BUCKET_NAME,
        })
        .promise();
      console.log('Upload successful:', upload);
    } catch (error) {
      console.error('Upload failed:', error);
      throw new UnprocessableEntityException(error.message);
    }

    return url;
  }
}
