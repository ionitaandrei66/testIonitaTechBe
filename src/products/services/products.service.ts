import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas/products.schema';
import { ProductInterface } from '../interfaces/products.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly model: Model<ProductDocument>,
  ) {}

  async create(product: ProductInterface): Promise<Product | undefined> {
    return await new this.model({
      ...product,
    }).save();
  }

  async getAll(): Promise<Product[]> {
    return await this.model.find().exec();
  }
}
