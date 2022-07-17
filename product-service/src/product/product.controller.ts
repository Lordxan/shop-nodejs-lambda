import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/products')
  getProductsList() {
    return this.productService.getAll();
  }

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
