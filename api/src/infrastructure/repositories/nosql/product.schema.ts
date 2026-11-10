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