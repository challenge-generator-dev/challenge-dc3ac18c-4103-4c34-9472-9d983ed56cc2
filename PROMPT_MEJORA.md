# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `api` | `api/` | practice | server | Node | DynamoDB, MongoDB |
| `client` | `client/` | chapter, support | client | React | - |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB, MongoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd api && npm install && npm run build` — componente `api` (practice).
3. `cd client && npm install && npm run build` — componente `client` (chapter, support).

### Contratos entre componentes

- `api` expone http (api: http://localhost:3000):
  - `POST /products`
  - `GET /products/:id`
  - `PUT /products/:id`
  - `DELETE /products/:id`
  - `GET /products`
- `client` expone http (api: http://localhost:3000):
  - `POST /products`
  - `GET /products/:id`
  - `PUT /products/:id`
  - `DELETE /products/:id`
  - `GET /products`

## Herramientas

- **IntelliJ IDEA Debugger**: Depura el componente con la run-config de IntelliJ IDEA (menu Run, carpeta .run/): pone breakpoints donde implementas el reto y arranca en modo debug.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `api/src/infrastructure/controllers/dto/product-response.dto.ts` — `Product.map`: Se invoca `map` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/infrastructure/controllers/product.controller.ts` — `ProductService.createProduct`: Se invoca `createProduct` sobre `ProductService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/infrastructure/controllers/product.controller.ts` — `ProductService.getProduct`: Se invoca `getProduct` sobre `ProductService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/infrastructure/controllers/product.controller.ts` — `ProductService.updateProduct`: Se invoca `updateProduct` sobre `ProductService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/infrastructure/controllers/product.controller.ts` — `ProductService.deleteProduct`: Se invoca `deleteProduct` sobre `ProductService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/infrastructure/controllers/product.controller.ts` — `ProductService.listProducts`: Se invoca `listProducts` sobre `ProductService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/application/services/product.service.ts` — `Product.filter`: Se invoca `filter` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología React, Trainee L2

### Brecha de conocimiento
Construye operaciones básicas, como crear, obtener, actualizar y eliminar (CRUD), en bases de datos SQL o NoSQL utilizando definición y manipulación de datos (DDL y DML) (corrida e2e 20261109191022203), Construye operaciones básicas, como crear, obtener, actualizar y eliminar (CRUD), en bases de datos SQL o NoSQL utilizando definición y manipulación de datos (DDL y DML)

### Reto
- Tema: Construye operaciones CRUD en Bases de Datos SQL y NoSQL
- Seniority: trainee-l2
- Tipo: practical
- Título: Implementación de Operaciones CRUD en Bases de Datos
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración del Entorno y Creación de la Base de Datos — objetivo: Configurar el entorno de desarrollo y crear la estructura básica de la base de datos. — entregable (NO resolver): Documentación de la configuración del entorno y script de creación de la base de datos.
- Fase 2: Implementación de Operaciones CRUD en Base de Datos SQL — objetivo: Implementar las operaciones CRUD en una base de datos SQL. — entregable (NO resolver): Scripts SQL que implementan las operaciones CRUD y manejan los errores y entradas duplicadas.
- Fase 3: Implementación de Operaciones CRUD en Base de Datos NoSQL — objetivo: Implementar las operaciones CRUD en una base de datos NoSQL. — entregable (NO resolver): Scripts NoSQL que implementan las operaciones CRUD y manejan los errores y entradas duplicadas.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: api/package.json ===
{
  "name": "inventory-api",
  "version": "1.0.0",
  "description": "API para gestión de inventario con operaciones CRUD en SQL y NoSQL",
  "main": "dist/main.js",
  "scripts": {
    "build": "rimraf dist && tsc",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "node dist/main",
    "start:dev": "nest start --watch",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "dependencies": {
    "@nestjs/common": "^11.0.0",
    "@nestjs/config": "^3.2.2",
    "@nestjs/core": "^11.0.0",
    "@nestjs/mongoose": "^11.0.0",
    "@nestjs/platform-express": "^11.0.0",
    "@nestjs/swagger": "^7.4.0",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.1",
    "mongoose": "^8.0.3",
    "pg": "^8.11.3",
    "reflect-metadata": "^0.1.13",
    "rimraf": "^5.0.5",
    "rxjs": "^7.8.1",
    "typeorm": "^0.3.20",
    "@nestjs/typeorm": "11.0.0"
  },
  "devDependencies": {
    "@nestjs/testing": "^11.0.0",
    "@types/express": "^5.0.0",
    "@types/jest": "^29.5.12",
    "@types/node": "^20.11.19",
    "@types/supertest": "^6.0.2",
    "jest": "^29.7.0",
    "prettier": "^3.2.5",
    "source-map-support": "^0.5.21",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.2",
    "ts-loader": "^9.5.1",
    "ts-node": "^10.9.2",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.3.3"
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}


// === ARCHIVO: api/tsconfig.json ===
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2021",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false,
    "esModuleInterop": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true
  },
  "exclude": ["node_modules", "dist", "test"],
  "include": ["src/**/*", "test/**/*"]
}

// === ARCHIVO: api/src/main.ts ===
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './infrastructure/common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Inventory API')
    .setDescription('API para gestión de inventario con operaciones CRUD en SQL y NoSQL')
    .setVersion('1.0')
    .addTag('products')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();

// === ARCHIVO: api/src/domain/entities/product.entity.ts ===
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

// === ARCHIVO: api/src/infrastructure/controllers/dto/create-product.dto.ts ===
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

// === ARCHIVO: api/src/infrastructure/controllers/dto/update-product.dto.ts ===
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

// === ARCHIVO: api/src/infrastructure/controllers/dto/product-response.dto.ts ===
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

// === ARCHIVO: api/src/infrastructure/controllers/product.controller.ts ===
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

// === ARCHIVO: api/src/infrastructure/repositories/sql/product.repository.sql.ts ===
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

// === ARCHIVO: api/src/infrastructure/repositories/nosql/product.repository.nosql.ts ===
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

// === ARCHIVO: api/src/infrastructure/repositories/nosql/product.schema.ts ===
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true, collection: 'products' })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, default: 0 })
  stock: number;

  @Prop({ required: true, unique: true })
  sku: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: false, default: true })
  active: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.index({ sku: 1 }, { unique: true });
ProductSchema.index({ category: 1 });
ProductSchema.index({ name: 'text', description: 'text' });

// === ARCHIVO: api/src/infrastructure/config/database.config.ts ===
import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import { Product } from '../../domain/entities/product.entity';

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory, MongooseOptionsFactory {
  private readonly logger = new Logger(DatabaseConfig.name);

  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const host = this.configService.get<string>('DB_SQL_HOST', 'localhost');
    const port = this.configService.get<number>('DB_SQL_PORT', 5432);
    const username = this.configService.get<string>('DB_SQL_USERNAME', 'postgres');
    const password = this.configService.get<string>('DB_SQL_PASSWORD', 'postgres');
    const database = this.configService.get<string>('DB_SQL_DATABASE', 'inventory');

    this.logger.log(`Configuring SQL database: ${host}:${port}/${database}`);

    return {
      type: 'postgres',
      host,
      port,
      username,
      password,
      database,
      entities: [Product],
      synchronize: this.configService.get<boolean>('DB_SQL_SYNCHRONIZE', false),
      logging: this.configService.get<boolean>('DB_SQL_LOGGING', false),
      ssl: this.configService.get<boolean>('DB_SQL_SSL', false) 
        ? { rejectUnauthorized: false } 
        : false,
      extra: {
        connectionLimit: this.configService.get<number>('DB_SQL_POOL_SIZE', 10),
        statement_timeout: this.configService.get<number>('DB_SQL_STATEMENT_TIMEOUT', 30000),
      },
    };
  }

  createMongooseOptions(): MongooseModuleOptions {
    const host = this.configService.get<string>('DB_NOSQL_HOST', 'localhost');
    const port = this.configService.get<number>('DB_NOSQL_PORT', 27017);
    const database = this.configService.get<string>('DB_NOSQL_DATABASE', 'inventory');
    const username = this.configService.get<string>('DB_NOSQL_USERNAME', '');
    const password = this.configService.get<string>('DB_NOSQL_PASSWORD', '');

    this.logger.log(`Configuring NoSQL database: ${host}:${port}/${database}`);

    const uri = username && password 
      ? `mongodb://${username}:${password}@${host}:${port}/${database}`
      : `mongodb://${host}:${port}/${database}`;

    return {
      uri,
      dbName: database,
      user: username || undefined,
      pass: password || undefined,
      serverSelectionTimeoutMS: this.configService.get<number>('DB_NOSQL_TIMEOUT', 5000),
      socketTimeoutMS: this.configService.get<number>('DB_NOSQL_SOCKET_TIMEOUT', 45000),
      maxPoolSize: this.configService.get<number>('DB_NOSQL_POOL_SIZE', 10),
      minPoolSize: this.configService.get<number>('DB_NOSQL_MIN_POOL_SIZE', 2),
    };
  }

  getSqlConfig(): TypeOrmModuleOptions {
    return this.createTypeOrmOptions();
  }

  getNoSqlConfig(): MongooseModuleOptions {
    return this.createMongooseOptions();
  }
}

@Injectable()
export class DatabaseConfigService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseConfigService.name);
  private isConnected: boolean = false;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    this.logger.log('Database configuration service initialized');
    this.isConnected = false;
  }

  onModuleDestroy() {
    this.logger.log('Database configuration service shutting down');
    this.isConnected = false;
  }

  getDatabaseType(): 'sql' | 'nosql' | 'both' {
    const useSql = this.configService.get<boolean>('USE_SQL_DATABASE', true);
    const useNoSql = this.configService.get<boolean>('USE_NOSQL_DATABASE', true);
    
    if (useSql && useNoSql) return 'both';
    if (useSql) return 'sql';
    if (useNoSql) return 'nosql';
    return 'sql';
  }

  isConnectedToSql(): boolean {
    return this.isConnected && this.getDatabaseType() !== 'nosql';
  }

  isConnectedToNoSql(): boolean {
    return this.isConnected && this.getDatabaseType() !== 'sql';
  }
}

// === ARCHIVO: api/src/app.module.ts ===
import { Module, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Product } from './domain/entities/product.entity';
import { ProductService } from './application/services/product.service';
import { ProductController } from './infrastructure/controllers/product.controller';
import { ProductSqlRepository } from './infrastructure/repositories/sql/product.repository.sql';
import { ProductRepositoryNoSql } from './infrastructure/repositories/nosql/product.repository.nosql';
import { DatabaseConfig, DatabaseConfigService } from './infrastructure/config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig = new DatabaseConfig(configService);
        return dbConfig.createMongooseOptions();
      },
    }),
    MongooseModule.forFeature([
      { name: Product.name, schema: require('./infrastructure/repositories/nosql/product.schema').ProductSchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductSqlRepository,
    ProductRepositoryNoSql,
    DatabaseConfig,
    DatabaseConfigService,
  ],
  exports: [ProductService, ProductSqlRepository, ProductRepositoryNoSql],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(AppModule.name);

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const useSql = this.configService.get<boolean>('USE_SQL_DATABASE', true);
    const useNoSql = this.configService.get<boolean>('USE_NOSQL_DATABASE', true);
    
    this.logger.log('Application module initialized');
    this.logger.log(`SQL Database enabled: ${useSql}`);
    this.logger.log(`NoSQL Database enabled: ${useNoSql}`);
    
    const databaseType = useSql && useNoSql 
      ? 'both SQL and NoSQL' 
      : useSql ? 'SQL only' : 'NoSQL only';
    
    this.logger.log(`Using database: ${databaseType}`);
  }
}

// === ARCHIVO: api/src/application/services/product.service.ts ===
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

// === ARCHIVO: api/test/product.service.spec.ts ===
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

// === ARCHIVO: api/README.md ===
# Inventory API

API para gestión de inventario con operaciones CRUD en SQL y NoSQL

## Requisitos Previos

- Node.js 22.x
- npm 10.x
- PostgreSQL (base de datos SQL)
- MongoDB (base de datos NoSQL)

## Configuración

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno en `.env`:
```env
# Base de datos SQL (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=inventory

# Base de datos NoSQL (MongoDB)
MONGODB_HOST=localhost
MONGODB_PORT=27017
MONGODB_DATABASE=inventory

# Puerto de la aplicación
APP_PORT=3000
```

## Ejecución

### Desarrollo
```bash
npm run start:dev
```

### Producción
```bash
npm run build
npm run start
```

## Pruebas

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas con coverage
npm run test:cov

# Ejecutar pruebas en modo watch
npm run test:watch
```

## Endpoints de la API

La API expone los siguientes endpoints para la gestión de productos:

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | /products | Crear un nuevo producto |
| GET | /products | Listar todos los productos |
| GET | /products/:id | Obtener un producto por ID |
| PUT | /products/:id | Actualizar un producto |
| DELETE | /products/:id | Eliminar un producto |

## Documentación Swagger

Una vez iniciada la aplicación, la documentación Swagger está disponible en:
```
http://localhost:3000/api
```

## Arquitectura

El proyecto sigue una arquitectura en capas:

- **Dominio** (`src/domain/`): Entidades y reglas de negocio
- **Aplicación** (`src/application/`): Servicios y casos de uso
- **Infraestructura** (`src/infrastructure/`): Controladores, repositorios y configuración

## Tecnologías

- NestJS 11
- TypeORM
- Mongoose
- PostgreSQL
- MongoDB
- Jest para pruebas

// === ARCHIVO: api/test/jest-e2e.json ===
{
  "moduleFileExtensions": [
    "js",
    "json",
    "ts"
  ],
  "rootDir": ".",
  "testEnvironment": "node",
  "testRegex": ".e2e-spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  }
}


// === ARCHIVO: api/src/infrastructure/common/filters/http-exception.filter.ts ===
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const responseObj = exceptionResponse as Record<string, unknown>;
        if (Array.isArray(responseObj.message)) {
          message = responseObj.message.join(', ');
        } else if (typeof responseObj.message === 'string') {
          message = responseObj.message;
        }
        if (typeof responseObj.error === 'string') {
          error = responseObj.error;
        }
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      this.logger.error(
        `Unhandled exception: ${exception.message}`,
        exception.stack,
      );
    }

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      error,
      message,
    };

    this.logger.warn(
      `${request.method} ${request.url} - ${status} - ${message}`,
    );

    response.status(status).json(errorResponse);
  }
}

// === ARCHIVO: api/src/domain/repositories/product.repository.interface.ts ===
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

// === ARCHIVO: api/src/domain/exceptions/product-not-found.exception.ts ===
import { NotFoundException } from '@nestjs/common';

export class ProductNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Producto no encontrado con ID: ${id}`, {
      description: 'PRODUCT_NOT_FOUND',
    });
  }
}

// === ARCHIVO: api/src/domain/exceptions/product-already-exists.exception.ts ===
import { ConflictException } from '@nestjs/common';

export class ProductAlreadyExistsException extends ConflictException {
  constructor(sku: string) {
    super(`Ya existe un producto con SKU: ${sku}`, {
      description: 'PRODUCT_ALREADY_EXISTS',
    });
  }
}

// === ARCHIVO: client/package.json ===
{
  "name": "client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest"
  },
  "dependencies": {
    "axios": "1.6.8",
    "react": "19.0.0-beta-0b1d4d3d9-20240815",
    "react-dom": "19.0.0-beta-0b1d4d3d9-20240815",
    "react-router-dom": "^6.22.0",
    "react-error-boundary": "4.0.13"
  },
  "devDependencies": {
    "@types/node": "20.12.7",
    "@types/react": "18.2.79",
    "@types/react-dom": "18.2.25",
    "@vitejs/plugin-react": "4.2.1",
    "autoprefixer": "10.4.19",
    "postcss": "8.4.38",
    "tailwindcss": "3.4.3",
    "typescript": "5.7.2",
    "vite": "5.2.10"
  }
}


// === ARCHIVO: client/vite.config.ts ===
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [
    react({
      babel: {
        presets: ['@babel/preset-typescript'],
        plugins: [['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]]
      }
    })
  ],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()]
    }
  },
  server: {
    port: 3000,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'axios']
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});

// === ARCHIVO: client/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}

// === ARCHIVO: client/src/main.tsx ===
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ErrorBoundary } from 'react-error-boundary';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={({ error, resetErrorBoundary }) => (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <h2 className="font-bold">Error</h2>
          <p>{error.message}</p>
          <button
            onClick={resetErrorBoundary}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Reintentar
          </button>
        </div>
      )}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// === ARCHIVO: client/src/App.tsx ===
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import InventoryPage from './pages/InventoryPage';

export interface ProductResponseDto {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
}

const App: React.FC = () => {
  const [products, setProducts] = useState<ProductResponseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<ProductResponseDto[]>('http://localhost:3000/products');
        setProducts(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido al cargar productos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCreateProduct = async (product: CreateProductDto) => {
    try {
      const response = await axios.post<ProductResponseDto>('http://localhost:3000/products', product);
      setProducts([...products, response.data]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear producto');
    }
  };

  const handleUpdateProduct = async (id: string, product: UpdateProductDto) => {
    try {
      const response = await axios.put<ProductResponseDto>(`http://localhost:3000/products/${id}`, product);
      setProducts(products.map(p => (p.id === id ? response.data : p)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar producto');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar producto');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        {error}
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <InventoryPage
              products={products}
              onCreateProduct={handleCreateProduct}
              onUpdateProduct={handleUpdateProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;

// === ARCHIVO: client/index.html ===
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Sistema de Gestión de Inventario - Tienda Online" />
    <meta name="keywords" content="inventario, gestión, productos, CRUD" />
    <meta name="author" content="Equipo de Desarrollo" />
    <meta name="robots" content="index, follow" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="theme-color" content="#4F46E5" />
    <title>Sistema de Gestión de Inventario</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  </head>
  <body class="antialiased">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

// === ARCHIVO: client/src/pages/InventoryPage.tsx ===
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ProductResponseDto, CreateProductDto, UpdateProductDto } from '../App';
import ProductForm from '../components/ProductForm';

const API_BASE_URL = 'http://localhost:3000';

export interface InventoryPageProps {
  onError?: (message: string) => void;
  onSuccess?: (message: string) => void;
}

export default function InventoryPage({ onError, onSuccess }: InventoryPageProps) {
  const [products, setProducts] = useState<ProductResponseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<ProductResponseDto | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<ProductResponseDto[]>(`${API_BASE_URL}/products`);
      setProducts(response.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar productos';
      setError(message);
      onError?.(message);
    } finally {
      setLoading(false);
    }
  }, [onError]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCreateProduct = async (data: CreateProductDto) => {
    try {
      setLoading(true);
      const response = await axios.post<ProductResponseDto>(`${API_BASE_URL}/products`, data);
      setProducts(prev => [...prev, response.data]);
      setShowForm(false);
      onSuccess?.('Producto creado exitosamente');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al crear producto';
      setError(message);
      onError?.(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async (id: string, data: UpdateProductDto) => {
    try {
      setLoading(true);
      const response = await axios.put<ProductResponseDto>(`${API_BASE_URL}/products/${id}`, data);
      setProducts(prev => prev.map(p => p.id === id ? response.data : p));
      setEditingProduct(null);
      setShowForm(false);
      onSuccess?.('Producto actualizado exitosamente');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al actualizar producto';
      setError(message);
      onError?.(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('¿Está seguro de que desea eliminar este producto?')) {
      return;
    }
    try {
      setDeletingId(id);
      await axios.delete(`${API_BASE_URL}/products/${id}`);
      setProducts(prev => prev.filter(p => p.id !== id));
      onSuccess?.('Producto eliminado exitosamente');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al eliminar producto';
      setError(message);
      onError?.(message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (product: ProductResponseDto) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleNewProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleSubmit = async (data: CreateProductDto | UpdateProductDto) => {
    if (editingProduct) {
      await handleUpdateProduct(editingProduct.id, data as UpdateProductDto);
    } else {
      await handleCreateProduct(data as CreateProductDto);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Gestión de Inventario</h1>
            <button
              onClick={handleNewProduct}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium text-sm"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nuevo Producto
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {showForm && (
          <div className="mb-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
            </h2>
            <ProductForm
              product={editingProduct}
              onSubmit={handleSubmit}
              onCancel={handleCancelForm}
              loading={loading}
            />
          </div>
        )}

        {loading && !products.length ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No hay productos</h3>
            <p className="mt-2 text-sm text-gray-500">Comience agregando un nuevo producto al inventario.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Stock: {product.stock}
                    </span>
                  </div>
                  {product.description && (
                    <p className="mt-2 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                  )}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-indigo-600">${product.price.toFixed(2)}</span>
                    <span className="text-xs text-gray-400">ID: {product.id.slice(0, 8)}</span>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      disabled={deletingId === product.id}
                      className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                    >
                      {deletingId === product.id ? (
                        <svg className="w-4 h-4 mr-1 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      )}
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// === ARCHIVO: client/src/components/ProductForm.tsx ===
import { useState, useEffect, FormEvent } from 'react';
import { ProductResponseDto, CreateProductDto, UpdateProductDto } from '../App';

interface ProductFormProps {
  product: ProductResponseDto | null;
  onSubmit: (data: CreateProductDto | UpdateProductDto) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

interface FormData {
  name: string;
  description: string;
  price: string;
  stock: string;
  sku: string;
}

interface FormErrors {
  name?: string;
  price?: string;
  stock?: string;
  sku?: string;
}

const initialFormData: FormData = {
  name: '',
  description: '',
  price: '',
  stock: '',
  sku: ''
};

export default function ProductForm({ product, onSubmit, onCancel, loading }: ProductFormProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description || '',
        price: product.price.toString(),
        stock: product.stock.toString(),
        sku: product.sku || ''
      });
    } else {
      setFormData(initialFormData);
    }
  }, [product]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    } else if (formData.name.length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
    } else if (formData.name.length > 100) {
      newErrors.name = 'El nombre no puede exceder 100 caracteres';
    }

    const priceNum = parseFloat(formData.price);
    if (!formData.price || isNaN(priceNum)) {
      newErrors.price = 'El precio es obligatorio';
    } else if (priceNum <= 0) {
      newErrors.price = 'El precio debe ser mayor a 0';
    } else if (priceNum > 999999.99) {
      newErrors.price = 'El precio no puede exceder 999,999.99';
    }

    const stockNum = parseInt(formData.stock, 10);
    if (!formData.stock || isNaN(stockNum)) {
      newErrors.stock = 'El stock es obligatorio';
    } else if (stockNum < 0) {
      newErrors.stock = 'El stock no puede ser negativo';
    } else if (stockNum > 999999) {
      newErrors.stock = 'El stock no puede exceder 999,999';
    }

    if (!product && !formData.sku.trim()) {
      newErrors.sku = 'El SKU es obligatorio para nuevos productos';
    } else if (formData.sku.length > 50) {
      newErrors.sku = 'El SKU no puede exceder 50 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    try {
      const submitData: CreateProductDto | UpdateProductDto = {
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock, 10),
        ...(formData.sku.trim() && { sku: formData.sku.trim() })
      };
      
      await onSubmit(submitData);
    } catch (error) {
      console.error('Error al guardar producto:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClasses = (error?: string) => `
    block w-full rounded-md border-gray-300 shadow-sm
    focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
    ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
  `;

  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Nombre del Producto <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={loading || submitting}
            className={inputClasses(errors.name)}
            placeholder="Ingrese el nombre del producto"
            maxLength={100}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="sku" className={labelClasses}>
            SKU <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="sku"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            disabled={loading || submitting || !!product}
            className={inputClasses(errors.sku)}
            placeholder="Código único del producto"
            maxLength={50}
          />
          {errors.sku && (
            <p className="mt-1 text-sm text-red-600">{errors.sku}</p>
          )}
          {product && (
            <p className="mt-1 text-xs text-gray-500">El SKU no se puede modificar</p>
          )}
        </div>

        <div>
          <label htmlFor="price" className={labelClasses}>
            Precio <span className="text-red-500">*</span>
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              disabled={loading || submitting}
              className={`${inputClasses(errors.price)} pl-7`}
              placeholder="0.00"
              step="0.01"
              min="0"
              max="999999.99"
            />
          </div>
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price}</p>
          )}
        </div>

        <div>
          <label htmlFor="stock" className={labelClasses}>
            Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            disabled={loading || submitting}
            className={inputClasses(errors.stock)}
            placeholder="Cantidad en inventario"
            min="0"
            max="999999"
          />
          {errors.stock && (
            <p className="mt-1 text-sm text-red-600">{errors.stock}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="description" className={labelClasses}>
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          disabled={loading || submitting}
          rows={3}
          className={inputClasses()}
          placeholder="Descripción opcional del producto"
          maxLength={500}
        />
        <p className="mt-1 text-xs text-gray-500">
          {formData.description.length}/500 caracteres
        </p>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading || submitting}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading || submitting}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center"
        >
          {submitting && (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {product ? 'Actualizar Producto' : 'Crear Producto'}
        </button>
      </div>
    </form>
  );
}

// === ARCHIVO: client/src/index.css ===
/* Estilos pendientes: archivo creado automaticamente porque otro modulo lo importa. */


// === ARCHIVO: .run/api.run.xml ===
<component name="ProjectRunConfigurationManager">
  <configuration default="false" name="api" type="js.build_tools.npm" nameIsGenerated="false">
    <package-json value="$PROJECT_DIR$/api/package.json" />
    <command value="run" />
    <scripts>
      <script value="start" />
    </scripts>
    <node-interpreter value="project" />
    <envs>
      <env name="DYNAMODB_ENDPOINT" value="http://localhost:8000" />
      <env name="AWS_REGION" value="us-east-1" />
      <env name="AWS_ACCESS_KEY_ID" value="local" />
      <env name="AWS_SECRET_ACCESS_KEY" value="local" />
      <env name="MONGODB_URI" value="mongodb://localhost:27017/app" />
    </envs>
    <method v="2" />
  </configuration>
</component>


// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s
  mongo:
    image: "mongo:7.0.14"
    ports:
      - "127.0.0.1:27017:27017"
    environment:
      MONGO_INITDB_DATABASE: "app"
    volumes:
      - "./infra-local/mongo/init.js:/docker-entrypoint-initdb.d/init.js:ro"
    healthcheck:
      test: ["CMD","mongosh","--quiet","--eval","db.adminCommand('ping').ok"]
      interval: 10s
      timeout: 10s
      retries: 10
      start_period: 20s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |
| MongoDB | `mongo:7.0.14` | 27017 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "app-items" "id"


// === ARCHIVO: infra-local/mongo/init.js ===
// Se ejecuta una sola vez al crear el volumen de MongoDB (docker-entrypoint-initdb.d).
db = db.getSiblingDB('app');
db.createCollection('items');
db.items.createIndex({ name: 1 });

```
