import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiResponse({
    status: 200,
    description: 'Gets all products avalible',
  })
  @Get('/products')
  getProductsList() {
    return this.productService.getAll();
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
  getProductsById(@Param('productId') id: string) {
    const foundProduct = this.productService.findByQuery([
      'details.isbn_13',
      [id],
    ]);
    if (!foundProduct) {
      throw new NotFoundException();
    }
    return foundProduct;
  }
}
