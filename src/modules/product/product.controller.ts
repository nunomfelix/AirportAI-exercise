import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schemas/product.schema';
import { RoleType } from '../../shared/constants';
import { Auth, AuthUser, UUIDParam } from '../../core/decorators';
import { User } from '../user/schemas/user.schema';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Auth([RoleType.AGENT])
  async create(
    @Body() createProductDto: CreateProductDto,
    @AuthUser() user: User,
  ): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Get()
  @Auth([RoleType.AGENT])
  async list(): Promise<Product[]> {
    console.log('entrei aqui');
    return this.productService.findAll();
  }

  @Get(':id')
  @Auth([RoleType.AGENT])
  async findOne(@UUIDParam('id') id: string): Promise<Product> {
    return this.productService.findOne(+id);
  }

  @Put(':id')
  @Auth([RoleType.AGENT])
  async update(
    @UUIDParam('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Auth([RoleType.AGENT])
  async delete(@UUIDParam('id') id: string): Promise<Product> {
    return this.productService.delete(id);
  }
}
