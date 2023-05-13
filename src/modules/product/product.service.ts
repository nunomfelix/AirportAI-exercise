import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import { OpenAiService } from '../../shared/services/openai.service';
import { SearchProductDto } from './dto/search-product.dto';

interface Query {
  lostTime?: { $gte: Date };
  type?: string;
  brand?: string;
  color?: string;
}

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
    private readonly openAiService: OpenAiService,
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

  async search(searchProductDto: SearchProductDto): Promise<Product[]> {
    const context = await this.openAiService.parseMessage(
      searchProductDto.message,
    );
    const query: Query = {};

    if (context.type) {
      query.type = context.type.toLowerCase();
    }
    if (context.brand) {
      query.brand = context.brand.toLowerCase();
    }
    if (context.color) {
      query.color = context.color.toLowerCase();
    }
    if (searchProductDto.lostTime) {
      query.lostTime = { $gte: new Date(searchProductDto.lostTime) };
    }
    return this.productModel.find(query);
  }
}
