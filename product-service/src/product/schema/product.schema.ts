import { ApiProperty } from '@nestjs/swagger';
import { product } from '@prisma/client';

export class Product implements product {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty({ required: false })
  description: string;
  @ApiProperty()
  price: number;
}
