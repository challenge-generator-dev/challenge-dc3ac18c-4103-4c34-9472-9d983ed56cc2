import {
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, QueryFailedError } from 'typeorm';
import { Product } from '../../../domain/entities/product.entity';
import { IProductRepository } from '../../../domain/repositories/product.repository.interface';
import { ProductNotFoundException } from '../../../domain/exceptions/product-not-found.exception';
import { ProductAlreadyExistsException } from '../../../domain/exceptions/product-already-exists.exception';

@Injectable()
export class ProductSqlRepository implements IProductRepository {
  private readonly logger = new Logger(ProductSqlRepository.name);

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly dataSource: DataSource,
  ) {}

  async create(product: Product): Promise<Product> {
    this.logger.log(`Creating new product with SKU: ${product.sku}`);
    try {
      const savedProduct = await this.productRepository.save(product);
      this.logger.log(`Product created successfully with ID: ${savedProduct.id}`);
      return savedProduct;
    } catch (error) {
      this.logger.error(`Failed to create product: ${error instanceof Error ? error.message : 'Unknown error'}`, error instanceof Error ? error.stack : undefined);
      if (this.isDuplicateKeyError(error)) {
        throw new ProductAlreadyExistsException(product.sku);
      }
      throw error;
    }
  }

  async findById(id: string): Promise<Product | null> {
    this.logger.debug(`Finding product by ID: ${id}`);
    try {
      const product = await this.productRepository.findOne({
        where: { id } as any,
      });
      if (!product) {
        this.logger.debug(`Product not found with ID: ${id}`);
        return null;
      }
      this.logger.debug(`Product found: ${product.name}`);
      return product;
    } catch (error) {
      this.logger.error(`Error finding product by ID: ${error instanceof Error ? error.message : 'Unknown error'}`, error instanceof Error ? error.stack : undefined);
      throw error;
    }
  }

  async findBySku(sku: string): Promise<Product | null> {
    this.logger.debug(`Finding product by SKU: ${sku}`);
    try {
      const product = await this.productRepository.findOne({
        where: { sku } as any,
      });
      if (!product) {
        this.logger.debug(`Product not found with SKU: ${sku}`);
        return null;
      }
      this.logger.debug(`Product found: ${product.name}`);
      return product;
    } catch (error) {
      this.logger.error(`Error finding product by SKU: ${error instanceof Error ? error.message : 'Unknown error'}`, error instanceof Error ? error.stack : undefined);
      throw error;
    }
  }

  async findAll(): Promise<Product[]> {
    this.logger.log('Fetching all products from SQL database');
    try {
      const products = await this.productRepository.find({
        order: {
          createdAt: 'DESC',
        } as any,
      });
      this.logger.log(`Found ${products.length} products`);
      return products;
    } catch (error) {
      this.logger.error(`Error fetching all products: ${error instanceof Error ? error.message : 'Unknown error'}`, error instanceof Error ? error.stack : undefined);
      throw error;
    }
  }

  async update(id: string, product: Product): Promise<Product> {
    this.logger.log(`Updating product with ID: ${id}`);
    try {
      const existingProduct = await this.findById(id);
      if (!existingProduct) {
        throw new ProductNotFoundException(id);
      }
      const updatedProduct = await this.productRepository.save({
        ...existingProduct,
        ...product,
        id,
        updatedAt: new Date(),
      });
      this.logger.log(`Product updated successfully: ${updatedProduct.name}`);
      return updatedProduct;
    } catch (error) {
      if (error instanceof ProductNotFoundException) {
        throw error;
      }
      this.logger.error(`Failed to update product: ${error instanceof Error ? error.message : 'Unknown error'}`, error instanceof Error ? error.stack : undefined);
      if (this.isDuplicateKeyError(error)) {
        throw new ProductAlreadyExistsException(product.sku);
      }
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Deleting product with ID: ${id}`);
    try {
      const result = await this.productRepository.delete(id);
      if (result.affected === 0) {
        this.logger.warn(`No product found to delete with ID: ${id}`);
        throw new ProductNotFoundException(id);
      }
      this.logger.log(`Product deleted successfully`);
    } catch (error) {
      if (error instanceof ProductNotFoundException) {
        throw error;
      }
      this.logger.error(`Failed to delete product: ${error instanceof Error ? error.message : 'Unknown error'}`, error instanceof Error ? error.stack : undefined);
      throw error;
    }
  }

  private isDuplicateKeyError(error: any): boolean {
    if (error instanceof QueryFailedError) {
      const pgError = error as any;
      return pgError.code === '23505';
    }
    return false;
  }

  async existsBySku(sku: string): Promise<boolean> {
    this.logger.debug(`Checking if product exists with SKU: ${sku}`);
    try {
      const count = await this.productRepository.count({
        where: { sku } as any,
      });
      return count > 0;
    } catch (error) {
      this.logger.error(`Error checking product existence: ${error instanceof Error ? error.message : 'Unknown error'}`, error instanceof Error ? error.stack : undefined);
      throw error;
    }
  }
}

export { ProductSqlRepository as ProductRepositorySql };
export { ProductSqlRepository as ProductRepositorySQL };