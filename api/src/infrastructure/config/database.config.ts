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