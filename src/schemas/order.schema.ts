import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true }) userId: string;
  @Prop([{ productId: String, quantity: Number, price: Number }]) items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  @Prop() total: number;
  @Prop({ default: 'pending' }) status:
    | 'pending'
    | 'paid'
    | 'shipped'
    | 'delivered';
  @Prop({ type: Object }) shippingAddress?: any;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
