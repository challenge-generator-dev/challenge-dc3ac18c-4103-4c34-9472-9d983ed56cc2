import { Injectable, Logger, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Product } from '../../../domain/entities/product.entity';
import { ProductDocument } from './product.schema';

@Injectable()
export class ProductRepositoryNoSql {
  private readonly logger = new Logger(ProductRepositoryNoSql.name);

  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(productData: Partial<Product>): Promise<Product> {
    this.logger.log(`Creating product in NoSQL: ${productData.name}`);
    
    const existingProduct = await this.productModel.findOne({ 
      sku: productData.sku 
    }).exec();
    
    if (existingProduct) {
      this.logger.warn(`Product with SKU ${productData.sku} already exists`);
      throw new ConflictException(`Product with SKU ${productData.sku} already exists`);
    }

    const createdProduct = new this.productModel(productData);
    const savedProduct = await createdProduct.save();
    
    this.logger.log(`Product created with ID: ${savedProduct.id}`);
    return this.mapToEntity(savedProduct);
  }

  async findById(id: string): Promise<Product> {
    this.logger.log(`Finding product by ID in NoSQL: ${id}`);
    
    const product = await this.productModel.findById(id).exec();
    
    if (!product) {
      this.logger.warn(`Product not found: ${id}`);
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    
    return this.mapToEntity(product);
  }

  async findAll(): Promise<Product[]> {
    this.logger.log('Fetching all products from NoSQL');
    
    const products = await this.productModel.find().exec();
    
    this.logger.log(`Found ${products.length} products`);
    return products.map(product => this.mapToEntity(product));
  }

  async update(id: string, updateData: Partial<Product>): Promise<Product> {
    this.logger.log(`Updating product in NoSQL: ${id}`);
    
    const product = await this.productModel.findById(id).exec();
    
    if (!product) {
      this.logger.warn(`Product not found for update: ${id}`);
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    if (updateData.sku && updateData.sku !== product.sku) {
      const existingWithSku = await this.productModel.findOne({ 
        sku: updateData.sku,
        _id: { $ne: product._id }
      }).exec();
      
      if (existingWithSku) {
        throw new ConflictException(`Product with SKU ${updateData.sku} already exists`);
      }
    }

    Object.assign(product, updateData);
    const updatedProduct = await product.save();
    
    this.logger.log(`Product updated: ${id}`);
    return this.mapToEntity(updatedProduct);
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Deleting product from NoSQL: ${id}`);
    
    const result = await this.productModel.deleteOne({ _id: id }).exec();
    
    if (result.deletedCount === 0) {
      this.logger.warn(`Product not found for deletion: ${id}`);
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    
    this.logger.log(`Product deleted: ${id}`);
  }

  async findBySku(sku: string): Promise<Product | null> {
    this.logger.log(`Finding product by SKU in NoSQL: ${sku}`);
    
    const product = await this.productModel.findOne({ sku }).exec();
    
    if (!product) {
      return null;
    }
    
    return this.mapToEntity(product);
  }

  private mapToEntity(document: ProductDocument): Product {
    const entity = new Product(
      document.name,
      document.description,
      document.price,
      document.stock,
      document.sku,
      document.category,
    );
    entity.id = document._id.toString();
    return entity;
  }
}