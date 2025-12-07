import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../schemas/order.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) { }

  create(
    userId: string,
    items: { productId: string; quantity: number; price: number }[],
    shippingAddress: any,
  ) {
    const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
    return this.orderModel.create({ userId, items, total, shippingAddress });
  }

  findByUser(userId: string) {
    return this.orderModel.find({ userId }).exec();
  }

  findAll() {
    return this.orderModel.find().exec();
  }
}
