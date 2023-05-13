import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchProductDto } from './dto/search-product.dto';
import { Product } from './schemas/product.schema';
import { RoleType } from '../../shared/constants';
import { User, UserDocument } from '../user/schemas/user.schema';

const testProduct: Product = {
  type: 'jacket',
  description: 'this is a product description',
  brand: 'ralph lauren',
  color: 'blue',
  lostTime: new Date(),
};

const testUser = {
  username: 'user',
  password: 'test',
  role: RoleType.AGENT,
  createdAt: new Date(),
} as UserDocument;

const createProductDto: CreateProductDto = {
  type: 'type',
  description: 'description',
  brand: 'brand',
  color: 'color',
  lostTime: new Date(),
};

const updateProductDto: UpdateProductDto = {
  description: 'description updated',
};

const searchProductDto: SearchProductDto = {
  message: 'I lost my blue ralph lauren jacket',
};

const mockProductService = {
  create: jest.fn().mockResolvedValue(testProduct),
  findAll: jest.fn().mockResolvedValue([testProduct]),
  findById: jest.fn().mockResolvedValue(testProduct),
  update: jest.fn().mockResolvedValue(testProduct),
  delete: jest.fn().mockResolvedValue(testProduct),
  search: jest.fn().mockResolvedValue([testProduct]),
};

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [{ provide: ProductService, useValue: mockProductService }],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should create a product', async () => {
    expect(controller.create(createProductDto, testUser)).resolves.toEqual(testProduct);
    expect(service.create).toBeCalledWith(createProductDto);
  });

  it('should list all products', async () => {
    expect(controller.list(testUser)).resolves.toEqual([testProduct]);
    expect(service.findAll).toBeCalled();
  });

  it('should find a product by id', async () => {
    const id = 'testId';
    expect(controller.findById(id)).resolves.toEqual(testProduct);
    expect(service.findById).toBeCalledWith(id);
  });

  it('should update a product', async () => {
    const id = 'testId';
    expect(controller.update(id, updateProductDto)).resolves.toEqual(testProduct);
    expect(service.update).toBeCalledWith(id, updateProductDto);
  });

  it('should delete a product', async () => {
    const id = 'testId';
    expect(controller.delete(id)).resolves.toEqual(testProduct);
    expect(service.delete).toBeCalledWith(id);
  });

  it('should search for a product', async () => {
    expect(controller.search(searchProductDto)).resolves.toEqual([testProduct]);
    expect(service.search).toBeCalledWith(searchProductDto);
  });
});
