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