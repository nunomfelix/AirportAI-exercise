import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

interface Query {
  $text?: { $search: string };
  lostTime?: { $gte: Date };
}

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findById(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Product> {
    return this.productModel.findByIdAndRemove(id).exec();
  }

  async searchByKeywords(
    keywords: string,
    lostTime: string,
  ): Promise<Product[]> {
    const query: Query = {};
    if (keywords) {
      query.$text = { $search: keywords };
    }
    if (lostTime) {
      query.lostTime = { $gte: new Date(lostTime) };
    }
    return this.productModel.find(query);
  }
}
