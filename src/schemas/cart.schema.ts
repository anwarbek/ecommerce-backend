import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class Cart {
  @Prop({ required: true }) userId: string;
  @Prop([{ productId: String, quantity: Number }]) items: {
    productId: string;
    quantity: number;
  }[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
