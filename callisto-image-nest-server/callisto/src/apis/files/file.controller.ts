import {
  Body,
  Controller,
  Post,
  UnprocessableEntityException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { Express } from 'express';
import { JwtAuthGuard } from 'src/commons/auth/jwtAuthGuard';
import { JwtPayload } from 'src/commons/auth/jwt-access.strategy';
import { CurrentUser } from 'src/commons/auth/user.params';
import { ApiTags } from '@nestjs/swagger';
import { BucketService } from '../buckets/bucket.service';
import { UpLoadFileInput } from './dto/uploadFile.input';
import { ImageService } from '../images/image.service';

@ApiTags('File API')
@Controller('/files')
export class FileController {
  //
  constructor(
    private readonly fileService: FileService, //
    private readonly bucketService: BucketService, //
    private readonly imageService: ImageService,
  ) {}
  //
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File, //
    @CurrentUser() currentUser: JwtPayload,
    @Body() uploadFileInput: UpLoadFileInput,
  ) {
    const { sub: profile_id } = currentUser;
    const bucket_id = parseInt(uploadFileInput.bucket_id);

    // 1. 버킷 목록에 존재하는지 확인
    const bucket = await this.bucketService.findOneById(bucket_id);
    if (!bucket) {
      // 2. 버킷이 존재하지 않는다면 에러 발생
      return new UnprocessableEntityException('존재하지 않는 버킷입니다.');
    }
    // 3. 버킷(폴더)가 존재함으로 파일 업로드
    const url = await this.fileService.upload({ file, bucket_id });

    // 4. 업로드됬다면 이미지 이미지 테이블에 저장
    const image = await this.imageService.create({
      url,
      bucket_id,
      profile_id,
    });

    return image;
  }
}
