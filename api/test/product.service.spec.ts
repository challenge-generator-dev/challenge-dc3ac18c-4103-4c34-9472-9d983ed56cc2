import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../src/application/services/product.service';
import { Product } from '../src/domain/entities/product.entity';
import { ProductSqlRepository } from '../src/infrastructure/repositories/sql/product.repository.sql';
import { ProductRepositoryNoSql } from '../src/infrastructure/repositories/nosql/product.repository.nosql';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { CreateProductDto } from '../src/infrastructure/controllers/dto/create-product.dto';
import { UpdateProductDto } from '../src/infrastructure/controllers/dto/update-product.dto';

describe('ProductService', () => {
  let service: ProductService;
  let sqlRepository: jest.Mocked<ProductSqlRepository>;
  let nosqlRepository: jest.Mocked<ProductRepositoryNoSql>;

  const mockProduct: Product = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Test Product',
    description: 'Test Description',
    price: 100.50,
    stock: 10,
    category: 'electronics',
    createdAt: new Date(),
    updatedAt: new Date(),
    updateStock: function(newStock: number): void {},
    updatePrice: function(newPrice: number): void {},
  };

  beforeEach(async () => {
    const mockSqlRepository = {
      findByName: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findBySku: jest.fn(),
      existsBySku: jest.fn(),
      create: jest.fn(),
    };

    const mockNoSqlRepository = {
      findByName: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findBySku: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductSqlRepository,
          useValue: mockSqlRepository,
        },
        {
          provide: ProductRepositoryNoSql,
          useValue: mockNoSqlRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    sqlRepository = module.get(ProductSqlRepository);
    nosqlRepository = module.get(ProductRepositoryNoSql);
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('debería crear un producto cuando no existe en ninguna base de datos', async () => {
      const createDto = new CreateProductDto();
      createDto.name = 'New Product';
      createDto.description = 'New Description';
      createDto.price = 50;
      createDto.stock = 5;
      createDto.category = 'books';

      sqlRepository.findByName.mockResolvedValue(null);
      nosqlRepository.findByName.mockResolvedValue(null);
      sqlRepository.save.mockResolvedValue(mockProduct);
      nosqlRepository.save.mockResolvedValue(mockProduct);

      const result = await service.create(createDto);

      expect(result).toBeDefined();
      expect(sqlRepository.save).toHaveBeenCalled();
      expect(nosqlRepository.save).toHaveBeenCalled();
    });

    it('debería lanzar ConflictException si el producto existe en SQL', async () => {
      const createDto = new CreateProductDto();
      createDto.name = 'Existing Product';
      createDto.description = 'Description';
      createDto.price = 100;
      createDto.stock = 10;
      createDto.category = 'electronics';

      sqlRepository.findByName.mockResolvedValue(mockProduct);

      await expect(service.create(createDto)).rejects.toThrow(ConflictException);
    });

    it('debería lanzar ConflictException si el producto existe en NoSQL', async () => {
      const createDto = new CreateProductDto();
      createDto.name = 'Existing Product';
      createDto.description = 'Description';
      createDto.price = 100;
      createDto.stock = 10;
      createDto.category = 'electronics';

      sqlRepository.findByName.mockResolvedValue(null);
      nosqlRepository.findByName.mockResolvedValue(mockProduct);

      await expect(service.create(createDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findOne', () => {
    it('debería retornar el producto cuando existe en SQL', async () => {
      sqlRepository.findById.mockResolvedValue(mockProduct);

      const result = await service.findOne(mockProduct.id);

      expect(result).toBeDefined();
      expect(result.id).toBe(mockProduct.id);
      expect(sqlRepository.findById).toHaveBeenCalledWith(mockProduct.id);
    });

    it('debería retornar el producto cuando existe en NoSQL', async () => {
      sqlRepository.findById.mockResolvedValue(null);
      nosqlRepository.findById.mockResolvedValue(mockProduct);

      const result = await service.findOne(mockProduct.id);

      expect(result).toBeDefined();
      expect(result.id).toBe(mockProduct.id);
      expect(nosqlRepository.findById).toHaveBeenCalledWith(mockProduct.id);
    });

    it('debería lanzar NotFoundException cuando el producto no existe', async () => {
      sqlRepository.findById.mockResolvedValue(null);
      nosqlRepository.findById.mockResolvedValue(null);

      await expect(service.findOne('non-existent-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('debería retornar todos los productos de ambas bases de datos sin duplicados', async () => {
      const sqlProducts = [mockProduct];
      const nosqlProducts = [mockProduct];

      sqlRepository.findAll.mockResolvedValue(sqlProducts);
      nosqlRepository.findAll.mockResolvedValue(nosqlProducts);

      const result = await service.findAll();

      expect(result).toBeDefined();
      expect(result.length).toBe(1);
    });

    it('debería combinar productos de ambas bases de datos', async () => {
      const sqlProduct = { ...mockProduct, id: 'sql-id' };
      const nosqlProduct = { ...mockProduct, id: 'nosql-id' };

      sqlRepository.findAll.mockResolvedValue([sqlProduct]);
      nosqlRepository.findAll.mockResolvedValue([nosqlProduct]);

      const result = await service.findAll();

      expect(result.length).toBe(2);
    });
  });

  describe('update', () => {
    it('debería actualizar el producto cuando existe en SQL', async () => {
      const updateDto = new UpdateProductDto();
      updateDto.name = 'Updated Name';
      updateDto.price = 200;

      sqlRepository.findById.mockResolvedValue(mockProduct);
      sqlRepository.update.mockResolvedValue({ ...mockProduct, name: 'Updated Name', price: 200 });
      nosqlRepository.update.mockResolvedValue({ ...mockProduct, name: 'Updated Name', price: 200 });

      const result = await service.update(mockProduct.id, updateDto);

      expect(result.name).toBe('Updated Name');
      expect(result.price).toBe(200);
    });

    it('debería actualizar el producto cuando existe en NoSQL', async () => {
      const updateDto = new UpdateProductDto();
      updateDto.name = 'Updated Name';
      updateDto.price = 200;

      sqlRepository.findById.mockResolvedValue(null);
      nosqlRepository.findById.mockResolvedValue(mockProduct);
      nosqlRepository.update.mockResolvedValue({ ...mockProduct, name: 'Updated Name', price: 200 });
      sqlRepository.update.mockResolvedValue({ ...mockProduct, name: 'Updated Name', price: 200 });

      const result = await service.update(mockProduct.id, updateDto);

      expect(result.name).toBe('Updated Name');
    });

    it('debería lanzar NotFoundException cuando el producto no existe', async () => {
      const updateDto = new UpdateProductDto();
      updateDto.name = 'Updated Name';

      sqlRepository.findById.mockResolvedValue(null);
      nosqlRepository.findById.mockResolvedValue(null);

      await expect(service.update('non-existent-id', updateDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('debería eliminar el producto de SQL cuando existe', async () => {
      sqlRepository.findById.mockResolvedValue(mockProduct);
      sqlRepository.delete.mockResolvedValue(undefined);

      await service.remove(mockProduct.id);

      expect(sqlRepository.delete).toHaveBeenCalledWith(mockProduct.id);
    });

    it('debería eliminar el producto de NoSQL cuando existe', async () => {
      sqlRepository.findById.mockResolvedValue(null);
      nosqlRepository.findById.mockResolvedValue(mockProduct);
      nosqlRepository.delete.mockResolvedValue(undefined);

      await service.remove(mockProduct.id);

      expect(nosqlRepository.delete).toHaveBeenCalledWith(mockProduct.id);
    });

    it('debería eliminar de ambas bases de datos cuando existe en ambas', async () => {
      sqlRepository.findById.mockResolvedValue(mockProduct);
      nosqlRepository.findById.mockResolvedValue(mockProduct);
      sqlRepository.delete.mockResolvedValue(undefined);
      nosqlRepository.delete.mockResolvedValue(undefined);

      await service.remove(mockProduct.id);

      expect(sqlRepository.delete).toHaveBeenCalledWith(mockProduct.id);
      expect(nosqlRepository.delete).toHaveBeenCalledWith(mockProduct.id);
    });

    it('debería lanzar NotFoundException cuando el producto no existe', async () => {
      sqlRepository.findById.mockResolvedValue(null);
      nosqlRepository.findById.mockResolvedValue(null);

      await expect(service.remove('non-existent-id')).rejects.toThrow(NotFoundException);
    });
  });
});