import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) { }

  async create(dto: Partial<Product>) {
    return this.productModel.create(dto);
  }

  async findAll(query: any) {
    const { page = 1, limit = 12, brand, category, min, max, sort } = query;
    const filters: any = {};
    if (brand) filters.brand = brand;
    if (category) filters.category = category;
    if (min) filters.price = { ...(filters.price || {}), $gte: Number(min) };
    if (max) filters.price = { ...(filters.price || {}), $lte: Number(max) };

    const skip = (Number(page) - 1) * Number(limit);
    let cursor = this.productModel
      .find(filters)
      .skip(skip)
      .limit(Number(limit));
    if (sort) {
      const s: any = {};
      if (sort === 'price') s.price = 1;
      if (sort === '-price') s.price = -1;
      if (sort === 'rating') s.rating = -1;
      cursor = cursor.sort(s);
    }
    const docs = await cursor.exec();
    const total = await this.productModel.countDocuments(filters);
    return { data: docs, total };
  }

  findById(id: string) {
    return this.productModel.findById(id).exec();
  }

  update(id: string, dto: Partial<Product>) {
    return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  remove(id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}
