import { ConflictException } from '@nestjs/common';

export class ProductAlreadyExistsException extends ConflictException {
  constructor(sku: string) {
    super(`Ya existe un producto con SKU: ${sku}`, {
      description: 'PRODUCT_ALREADY_EXISTS',
    });
  }
}