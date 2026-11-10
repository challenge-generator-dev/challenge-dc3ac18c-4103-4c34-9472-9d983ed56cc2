import { NotFoundException } from '@nestjs/common';

export class ProductNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Producto no encontrado con ID: ${id}`, {
      description: 'PRODUCT_NOT_FOUND',
    });
  }
}