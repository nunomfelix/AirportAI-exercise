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
import { Product } from './schemas/product.schema';
import { RoleType } from '../../shared/constants';
import { Auth, AuthUser, UUIDParam } from '../../core/decorators';
import { User, UserDocument } from '../user/schemas/user.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
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

  @Get('searchByKeywords')
  @Auth([])
  async searchByKeywords(
    @Query('keywords') keywords: string,
    @Query('lostTime') lostTime: string,
  ): Promise<Product[]> {
    return this.productService.searchByKeywords(keywords, lostTime);
  }

  // @Get('search')
  // @Auth([])
  // async searchByMessage(
  //   @Body searchByMessageDto: SearchByMessageDto
  // ): Promise<Product[]> {
  //   return this.productService.searchByMessage(searchByMessageDto);
  // }
}
