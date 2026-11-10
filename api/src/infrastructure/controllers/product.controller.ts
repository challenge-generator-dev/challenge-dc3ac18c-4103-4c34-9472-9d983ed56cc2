import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Inject,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ProductService } from '../../application/services/product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { ProductNotFoundException } from '../../domain/exceptions/product-not-found.exception';
import { ProductAlreadyExistsException } from '../../domain/exceptions/product-already-exists.exception';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(
    @Inject(ProductService)
    private readonly productService: ProductService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un nuevo producto', description: 'Crea un nuevo producto en el inventario' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Producto creado exitosamente',
    type: ProductResponseDto,
  } as ApiResponseOptions)
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'El producto con el SKU proporcionado ya existe',
  } as ApiResponseOptions)
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos',
  } as ApiResponseOptions)
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<ProductResponseDto> {
    const product = createProductDto.toEntity();
    const createdProduct = await this.productService.createProduct(product);
    return ProductResponseDto.fromEntity(createdProduct);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID', description: 'Retorna los detalles de un producto específico' })
  @ApiParam({
    name: 'id',
    description: 'UUID del producto',
    type: String,
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Producto encontrado',
    type: ProductResponseDto,
  } as ApiResponseOptions)
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Producto no encontrado',
  } as ApiResponseOptions)
  async getProduct(@Param('id', ParseUUIDPipe) id: string): Promise<ProductResponseDto> {
    const product = await this.productService.getProduct(id);
    if (!product) {
      throw new ProductNotFoundException(id);
    }
    return ProductResponseDto.fromEntity(product);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un producto', description: 'Actualiza los datos de un producto existente' })
  @ApiParam({
    name: 'id',
    description: 'UUID del producto a actualizar',
    type: String,
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Producto actualizado exitosamente',
    type: ProductResponseDto,
  } as ApiResponseOptions)
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Producto no encontrado',
  } as ApiResponseOptions)
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos',
  } as ApiResponseOptions)
  async updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    const existingProduct = await this.productService.getProduct(id);
    if (!existingProduct) {
      throw new ProductNotFoundException(id);
    }
    const updatedProduct = updateProductDto.applyToEntity(existingProduct);
    const result = await this.productService.updateProduct(id, updatedProduct);
    return ProductResponseDto.fromEntity(result);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un producto', description: 'Elimina un producto del inventario' })
  @ApiParam({
    name: 'id',
    description: 'UUID del producto a eliminar',
    type: String,
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Producto eliminado exitosamente',
  } as ApiResponseOptions)
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Producto no encontrado',
  } as ApiResponseOptions)
  async deleteProduct(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const existingProduct = await this.productService.getProduct(id);
    if (!existingProduct) {
      throw new ProductNotFoundException(id);
    }
    await this.productService.deleteProduct(id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los productos', description: 'Retorna una lista de todos los productos en el inventario' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de productos',
    type: [ProductResponseDto],
  } as ApiResponseOptions)
  async listProducts(): Promise<ProductResponseDto[]> {
    const products = await this.productService.listProducts();
    return ProductResponseDto.fromEntities(products);
  }
}