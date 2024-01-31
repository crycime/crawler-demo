import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { AppCrawlerGetResDto } from '../dto/appCrawlerGetRes.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('/app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/crawler')
  @ApiResponse({
    status: HttpStatus.OK,
    type: AppCrawlerGetResDto,
  })
  crawler(): Promise<AppCrawlerGetResDto> {
    return this.appService.crawler();
  }
}
