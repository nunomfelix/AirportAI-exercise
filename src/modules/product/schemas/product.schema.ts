import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true, type: Date })
  lostTime: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
