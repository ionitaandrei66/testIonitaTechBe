import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type ProductDocument = Product & Document;

@Schema()
export class Product extends Document {
  @Prop()
  id: string;

  @Prop()
  price: number;

  @Prop()
  title: string;
}

export const ProductsSettingsSchema = SchemaFactory.createForClass(Product);
