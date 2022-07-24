import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma.service';
import { Product } from './schema/product.schema';

@Controller()
export class ProductController {
  constructor(private readonly prisma: PrismaService) {}

  @ApiResponse({
    status: 200,
    description: 'Gets all products avalible',
  })
  @Get('/products')
  getProductsList() {
    return this.prisma.product.findMany({
      include: {
        stocks: true,
      },
    });
  }

  @ApiResponse({
    status: 200,
    description: 'Finds product',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  @Get('/products/:productId')
  async getProductsById(@Param('productId') id: string) {
    const foundProduct = await this.prisma.product.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!foundProduct) {
      throw new NotFoundException();
    }
    return foundProduct;
  }

  @ApiResponse({
    status: 200,
    description: 'Finds product',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  @ApiBody({
    type: Product,
  })
  @Post('/products')
  async postProduct(@Body() data: Product) {
    try {
      return await this.prisma.product.create({
        data,
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
