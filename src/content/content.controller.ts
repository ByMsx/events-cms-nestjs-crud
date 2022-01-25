import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Crud, CrudAuth } from '@nestjsx/crud';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ContentService } from './content.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  CreateContentDto,
  GetUploadLinkDto,
  UpdateContentDto,
} from './dto/request.dto';
import { ContentDto, GetUploadLinkResponseDto } from './dto/response.dto';
import { IsContentGroupOwnerGuard } from './is-content-group-owner.guard';
import { S3Service } from './s3.service';
import { RequestUserDto } from '../users/dto/request-user.dto';
import { GetHrefInterceptor } from './get-href.interceptor';
import { RemoveFileOnS3 } from './remove-file-on-s3.interceptor';

@UseGuards(JwtAuthGuard)
@ApiTags('Content')
@ApiBearerAuth()
@Controller('/content-groups/:groupId/content')
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
  params: {
    groupId: {
      type: 'number',
      field: 'groupId',
      primary: false,
    },
  },
  routes: {
    only: [
      'createOneBase',
      'replaceOneBase',
      'updateOneBase',
      'deleteOneBase',
      'getManyBase',
      'getOneBase',
    ],
    createOneBase: {
      decorators: [
        UseGuards(IsContentGroupOwnerGuard),
        UseInterceptors(GetHrefInterceptor),
      ],
    },
    replaceOneBase: {
      decorators: [UseGuards(IsContentGroupOwnerGuard)],
    },
    updateOneBase: {
      decorators: [UseGuards(IsContentGroupOwnerGuard)],
    },
    deleteOneBase: {
      decorators: [
        UseGuards(IsContentGroupOwnerGuard),
        UseInterceptors(RemoveFileOnS3),
      ],
    },
  },
})
@CrudAuth({
  property: 'user',
  filter: (user: RequestUserDto) => ({ 'group.ownerId': user.id }),
})
export class ContentController {
  constructor(public service: ContentService, public s3: S3Service) {}

  @Post('/upload')
  @UseGuards(IsContentGroupOwnerGuard)
  public async getUploadLink(
    @Body() body: GetUploadLinkDto,
  ): Promise<GetUploadLinkResponseDto> {
    return this.s3.getSignedUploadUrl(body.filename);
  }
}
