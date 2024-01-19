import { ApiProperty } from '@nestjs/swagger';

export class MeasureDto {
  @ApiProperty()
  SIZE: string;

  @ApiProperty()
  CHEST: string;

  @ApiProperty()
  LENGTH: string;

  @ApiProperty()
  SLEEVE: string;
}

export class AppCrawlerGetResDto {
  @ApiProperty({ isArray: true })
  imageUrlList: string[];

  @ApiProperty()
  title: string;

  @ApiProperty()
  originalPrice: string;

  @ApiProperty()
  preferentialPrice: string;

  @ApiProperty()
  colorList: string[];

  @ApiProperty()
  sizeList: string[];

  @ApiProperty({ isArray: true, type: MeasureDto })
  measure: MeasureDto[];

  @ApiProperty()
  descriptionList: string[];
}
