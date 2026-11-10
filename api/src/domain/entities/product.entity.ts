import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive, IsNotEmpty, IsOptional } from 'class-validator';

@Entity('products')
export class Product {
  @ApiProperty({ example: '1', description: 'Identificador único del producto' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Laptop Gaming', description: 'Nombre del producto' })
  @Column({ type: 'varchar', length: 100 })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Laptop de alto rendimiento para gaming', description: 'Descripción detallada del producto' })
  @Column({ type: 'text' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 1500.99, description: 'Precio del producto' })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price: number;

  @ApiProperty({ example: 50, description: 'Cantidad disponible en inventario' })
  @Column({ type: 'int' })
  @IsNumber()
  @IsPositive()
  stock: number;

  @ApiProperty({ example: 'electronics', description: 'Categoría del producto' })
  @Column({ type: 'varchar', length: 50 })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z', description: 'Fecha de creación del producto' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2023-01-02T00:00:00.000Z', description: 'Fecha de última actualización del producto' })
  @UpdateDateColumn()
  updatedAt: Date;

  constructor(
    name: string,
    description: string,
    price: number,
    stock: number,
    category: string,
    id?: string
  ) {
    this.id = id || '';
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.category = category;
  }

  updateStock(newStock: number): void {
    if (newStock < 0) {
      throw new Error('Stock cannot be negative');
    }
    this.stock = newStock;
  }

  updatePrice(newPrice: number): void {
    if (newPrice <= 0) {
      throw new Error('Price must be positive');
    }
    this.price = newPrice;
  }
}