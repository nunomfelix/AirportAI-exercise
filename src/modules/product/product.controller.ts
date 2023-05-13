import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchProductDto } from './dto/search-product.dto';
import { Product } from './schemas/product.schema';
import { RoleType } from '../../shared/constants';
import { Auth, AuthUser, UUIDParam } from '../../core/decorators';
import { User, UserDocument } from '../user/schemas/user.schema';
import { ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Auth([RoleType.AGENT])
  async create(
    @Body() createProductDto: CreateProductDto,
    @AuthUser() user: UserDocument,
  ): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Get()
  @Auth([RoleType.AGENT])
  async list(@AuthUser() user: UserDocument): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  @Auth([RoleType.AGENT])
  async findById(id: string): Promise<Product> {
    return this.productService.findById(id);
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
  async delete(@Param('id') id: string): Promise<Product> {
    return this.productService.delete(id);
  }

  @Post('search')
  async search(@Body() searchProductDto: SearchProductDto): Promise<Product[]> {
    return this.productService.search(searchProductDto);
  }
}
