import { Controller, Get } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { AppCrawlerGetResDto } from '../dto/appCrawlerGetRes.dto';

@Controller('/app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/crawler')
  crawler(): Promise<AppCrawlerGetResDto> {
    return this.appService.crawler();
  }
}
