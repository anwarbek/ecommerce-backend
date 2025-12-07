import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true }) title: string;
  @Prop() description: string;
  @Prop({ required: true }) price: number;
  @Prop() oldPrice?: number;
  @Prop() brand: string;
  @Prop() category: string;
  @Prop([String]) images: string[];
  @Prop({ default: 0 }) rating: number;
  @Prop({ default: 0 }) inStock: number;
  @Prop({ type: Object }) specs: Record<string, any>;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
