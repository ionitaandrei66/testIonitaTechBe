import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './services/products.service';
import { JwtService } from '@nestjs/jwt';
import { Product, ProductsSettingsSchema } from './schemas/products.schema';
@Module({
  providers: [ProductsService, JwtService],
  exports: [ProductsService],
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductsSettingsSchema },
    ]),
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
