import { Injectable } from '@nestjs/common';
import find from 'lodash.find';
import { Products } from '../../mock';

@Injectable()
export class ProductService {
  getAll() {
    return Products;
  }

  findByQuery(query?: any) {
    return find(Products, query);
  }
}
