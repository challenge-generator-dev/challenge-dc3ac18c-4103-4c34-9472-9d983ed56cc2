import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive, IsNotEmpty, IsOptional } from 'class-validator';
import { Product } from '../../../domain/entities/product.entity';


export class CreateProductDto {
  @ApiProperty({ example: 'Laptop Gaming', description: 'Nombre del producto' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Laptop de alto rendimiento para gaming', description: 'Descripción detallada del producto' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 1500.99, description: 'Precio del producto' })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price: number;

  @ApiProperty({ example: 50, description: 'Cantidad disponible en inventario' })
  @IsNumber()
  @IsPositive()
  stock: number;

  @ApiProperty({ example: 'electronics', description: 'Categoría del producto' })
  @IsString()
  @IsNotEmpty()
  category: string;

  toEntity(): Product {
    return new Product(
      this.name,
      this.description,
      this.price,
      this.stock,
      this.category
    );
  }
}