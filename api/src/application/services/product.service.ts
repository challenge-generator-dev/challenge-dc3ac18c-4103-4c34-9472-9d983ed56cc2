import { Injectable, NotFoundException, ConflictException, Inject, forwardRef } from '@nestjs/common';
import { Product } from '../../domain/entities/product.entity';
import { CreateProductDto } from '../../infrastructure/controllers/dto/create-product.dto';
import { UpdateProductDto } from '../../infrastructure/controllers/dto/update-product.dto';
import { ProductResponseDto } from '../../infrastructure/controllers/dto/product-response.dto';
import { ProductRepositorySQL } from '../../infrastructure/repositories/sql/product.repository.sql';
import { ProductRepositoryNoSql as ProductRepositoryNoSQL } from '../../infrastructure/repositories/nosql/product.repository.nosql';

@Injectable()
export class ProductService {
  constructor(
    @Inject(forwardRef(() => ProductRepositorySQL))
    private readonly sqlRepository: ProductRepositorySQL,
    @Inject(forwardRef(() => ProductRepositoryNoSQL))
    private readonly nosqlRepository: ProductRepositoryNoSQL,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<ProductResponseDto> {
    const existingSql = await this.sqlRepository.findByName(createProductDto.name);
    if (existingSql) {
      throw new ConflictException('El producto ya existe en la base de datos SQL');
    }

    const existingNoSql = await this.nosqlRepository.findByName(createProductDto.name);
    if (existingNoSql) {
      throw new ConflictException('El producto ya existe en la base de datos NoSQL');
    }

    const product = createProductDto.toEntity();
    const savedSql = await this.sqlRepository.save(product);
    const savedNoSql = await this.nosqlRepository.save(product);

    return this.mapToResponseDto(savedSql);
  }

  async findOne(id: string): Promise<ProductResponseDto> {
    const productSql = await this.sqlRepository.findById(id);
    if (productSql) {
      return this.mapToResponseDto(productSql);
    }

    const productNoSql = await this.nosqlRepository.findById(id);
    if (productNoSql) {
      return this.mapToResponseDto(productNoSql);
    }

    throw new NotFoundException(`Producto con ID ${id} no encontrado`);
  }

  async findAll(): Promise<ProductResponseDto[]> {
    const [sqlProducts, nosqlProducts] = await Promise.all([
      this.sqlRepository.findAll(),
      this.nosqlRepository.findAll(),
    ]);

    const allProducts = [...sqlProducts, ...nosqlProducts];
    const uniqueProducts = this.removeDuplicates(allProducts);

    return uniqueProducts.map(product => this.mapToResponseDto(product));
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<ProductResponseDto> {
    let product = await this.sqlRepository.findById(id);
    if (!product) {
      product = await this.nosqlRepository.findById(id);
    }

    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    const updatedProduct = updateProductDto.applyToEntity(product);

    await this.sqlRepository.update(id, updatedProduct);
    await this.nosqlRepository.update(id, updatedProduct);

    return this.mapToResponseDto(updatedProduct);
  }

  async remove(id: string): Promise<void> {
    const productSql = await this.sqlRepository.findById(id);
    const productNoSql = await this.nosqlRepository.findById(id);

    if (!productSql && !productNoSql) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    if (productSql) {
      await this.sqlRepository.delete(id);
    }
    if (productNoSql) {
      await this.nosqlRepository.delete(id);
    }
  }

  private mapToResponseDto(product: Product): ProductResponseDto {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  private removeDuplicates(products: Product[]): Product[] {
    const seen = new Set<string>();
    return products.filter(product => {
      if (seen.has(product.id)) {
        return false;
      }
      seen.add(product.id);
      return true;
    });
  }
}