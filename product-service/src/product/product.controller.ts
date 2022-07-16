import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/products')
  getProductsList() {
    return this.productService.getAll();
  }

  @Get('/products/:productId')
  getProductsById(@Param('productId') id) {
    return this.productService.findByQuery({ details: { isbn_10: id } });
  }
}
