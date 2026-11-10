import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Product } from '../../../domain/entities/product.entity';

export class ProductResponseDto {
  @ApiProperty({ description: 'Identificador único del producto', example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ description: 'Nombre del producto', example: 'Laptop Gaming Pro 15' })
  name: string;

  @ApiPropertyOptional({ description: 'Descripción del producto', example: 'Laptop de alta gama para gaming' })
  description?: string;

  @ApiProperty({ description: 'Precio del producto', example: 1299.99 })
  price: number;

  @ApiProperty({ description: 'Cantidad en stock', example: 50 })
  stock: number;

  @ApiProperty({ description: 'Código SKU del producto', example: 'LAP-GAM-PRO-15' })
  sku: string;

  @ApiProperty({ description: 'Fecha de creación del registro', example: '2024-01-15T10:30:00.000Z' })
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de última actualización del registro', example: '2024-01-20T14:45:00.000Z' })
  updatedAt: Date;

  static fromEntity(product: Product): ProductResponseDto {
    const dto = new ProductResponseDto();
    dto.id = product.id;
    dto.name = product.name;
    dto.description = product.description;
    dto.price = product.price;
    dto.stock = product.stock;
    dto.sku = product.sku;
    dto.createdAt = product.createdAt;
    dto.updatedAt = product.updatedAt;
    return dto;
  }

  static fromEntities(products: Product[]): ProductResponseDto[] {
    return products.map(product => ProductResponseDto.fromEntity(product));
  }
}