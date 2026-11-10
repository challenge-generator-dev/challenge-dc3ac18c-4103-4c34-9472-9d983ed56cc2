import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive, IsOptional } from 'class-validator';
import { Product } from '../../../domain/entities/product.entity';


export class UpdateProductDto {
  @ApiProperty({ example: 'Laptop Gaming Pro', description: 'Nombre del producto', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'Laptop de alto rendimiento para gaming con GPU mejorada', description: 'Descripción detallada del producto', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 1699.99, description: 'Precio del producto', required: false })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty({ example: 30, description: 'Cantidad disponible en inventario', required: false })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @ApiProperty({ example: 'gaming', description: 'Categoría del producto', required: false })
  @IsString()
  @IsOptional()
  category?: string;

  applyToEntity(product: Product): Product {
    if (this.name !== undefined) {
      product.name = this.name;
    }
    if (this.description !== undefined) {
      product.description = this.description;
    }
    if (this.price !== undefined) {
      product.updatePrice(this.price);
    }
    if (this.stock !== undefined) {
      product.updateStock(this.stock);
    }
    if (this.category !== undefined) {
      product.category = this.category;
    }
    return product;
  }
}