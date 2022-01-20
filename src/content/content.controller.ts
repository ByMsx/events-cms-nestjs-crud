import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  Crud,
  CrudAuth,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ContentService } from './content.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateContentDto, UpdateContentDto } from './dto/request.dto';
import {
  ContentDto,
  CreateContentResponseDto,
  SignedUrlDto,
} from './dto/response.dto';
import { IsContentGroupOwnerGuard } from './is-content-group-owner.guard';
import { S3Service } from './s3.service';
import { RequestUserDto } from '../users/dto/request-user.dto';

@UseGuards(JwtAuthGuard)
@ApiTags('Content')
@ApiBearerAuth()
@Controller('content')
@Crud({
  model: {
    type: ContentDto,
  },
  dto: {
    create: CreateContentDto,
    update: UpdateContentDto,
  },
  query: {
    join: {
      group: {
        eager: true,
        select: false,
      },
    },
  },
  routes: {
    replaceOneBase: {
      decorators: [UseGuards(IsContentGroupOwnerGuard)],
    },
    updateOneBase: {
      decorators: [UseGuards(IsContentGroupOwnerGuard)],
    },
    deleteOneBase: {
      decorators: [UseGuards(IsContentGroupOwnerGuard)],
    },
  },
})
@CrudAuth({
  property: 'user',
  filter: (user: RequestUserDto) => ({ 'group.ownerId': user.id }),
  persist: (user: RequestUserDto) => ({
    href: `random-string-${Math.random()}`,
  }),
})
export class ContentController {
  constructor(public service: ContentService, public s3: S3Service) {}

  @Override('createOneBase')
  public async createOneBase(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateContentDto,
  ): Promise<CreateContentResponseDto> {
    const { url, filename } = await this.s3.getSignedUploadUrl(dto.filename);
    const content = await this.service.createOne(req, {
      ...dto,
      filename,
    });
    return { ...content, url };
  }

  @Get('/:id/link')
  public async getDownloadLink(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SignedUrlDto> {
    const content = await this.service.findOne(id);
    const url = await this.s3.getSignedDownloadFileHref(content.filename);
    return { url };
  }

  @Override('deleteOneBase')
  public async deleteOneBase(@ParsedRequest() req: CrudRequest): Promise<void> {
    const content = await this.service.deleteOne(req);
    if (content) {
      await this.s3.removeFile(content.filename);
    } else {
      throw new Error('content assertion failed');
    }
  }
}
