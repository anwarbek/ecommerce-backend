import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from '../schemas/cart.schema';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) { }

  async getCart(userId: string) {
    return this.cartModel.findOne({ userId }).exec();
  }

  async addToCart(userId: string, productId: string, quantity = 1) {
    const cart = await this.cartModel.findOne({ userId });
    if (!cart) {
      return this.cartModel.create({
        userId,
        items: [{ productId, quantity }],
      });
    }
    const item = cart.items.find((i) => i.productId === productId);
    if (item) {
      item.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    return cart.save();
  }

  async removeFromCart(userId: string, productId: string) {
    const cart = await this.cartModel.findOne({ userId });
    if (!cart) return null;
    cart.items = cart.items.filter((i) => i.productId !== productId);
    return cart.save();
  }

  async clearCart(userId: string) {
    return this.cartModel.findOneAndUpdate(
      { userId },
      { items: [] },
      { new: true },
    );
  }
}
