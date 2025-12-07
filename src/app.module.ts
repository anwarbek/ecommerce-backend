import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { BrandsModule } from './brands/brands.module';
import { CategoriesModule } from './categories/categories.module';
import { UploadModule } from './upload/upload.module';

dotenv.config();

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error('MONGO_URI environment variable is not set');
}
@Module({
  imports: [
    MongooseModule.forRoot(mongoUri),
    AuthModule,
    UsersModule,
    ProductsModule,
    CartModule,
    OrdersModule,
    BrandsModule,
    CategoriesModule,
    UploadModule,
  ],
})
export class AppModule { }
