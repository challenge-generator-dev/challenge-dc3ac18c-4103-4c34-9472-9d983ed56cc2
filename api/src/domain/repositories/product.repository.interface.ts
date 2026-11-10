import { Product } from '../entities/product.entity';

export interface IProductRepository {
  create(product: Product): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  findBySku(sku: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  update(id: string, product: Product): Promise<Product>;
  delete(id: string): Promise<void>;
  existsBySku(sku: string): Promise<boolean>;
}