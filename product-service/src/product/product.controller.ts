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
      include: {
        stocks: true,
      },
    });
    if (!foundProduct) {
      throw new NotFoundException();
    }
    return foundProduct;
  }

  @ApiResponse({
    status: 200,
    description: 'Product added',
  })
  @ApiBody({
    type: Product,
  })
  @Post('/products')
  async postProduct(@Body() data: Product) {
    try {
      const product = await this.prisma.product.create({
        data,
      });
      await this.prisma.stocks.create({
        data: {
          count: 1,
          product_id: product.id,
        },
      });
      return { result: 'done' };
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
