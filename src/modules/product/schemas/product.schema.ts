import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({
    required: true,
    set: (type: string) => type.toLowerCase(),
  })
  type: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    required: true,
    set: (brand: string) => brand.toLowerCase(),
  })
  brand: string;

  @Prop({
    required: true,
    set: (color: string) => color.toLowerCase(),
  })
  color: string;

  @Prop({ required: true, type: Date })
  lostTime: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
