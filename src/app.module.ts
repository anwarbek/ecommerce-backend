import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { BrandModule } from './brand/brand.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { OrderModule } from './order/order.module';
import { SearchModule } from './search/search.module';
import { FileUploadModule } from './file_upload/file_upload.module';

@Module({
  imports: [AuthModule, CategoryModule, ProductModule, BrandModule, WishlistModule, OrderModule, SearchModule, FileUploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
