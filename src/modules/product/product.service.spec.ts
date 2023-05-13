import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { OpenAiService } from '../../shared/services/openai.service';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchProductDto } from './dto/search-product.dto';

describe('ProductService', () => {
  let service: ProductService;
  let openAiService: OpenAiService;

  const mockProductModel = function(dto) {
    return {
      ...dto,
      save: jest.fn().mockResolvedValueOnce({
        ...dto,
        _id: 'a uuid',
        createdAt: new Date()
      }),
    };
  };
  
  mockProductModel.find = jest.fn();
  mockProductModel.findById = jest.fn();
  mockProductModel.findByIdAndUpdate = jest.fn();
  mockProductModel.findByIdAndRemove = jest.fn();

  const mockOpenAiService = {
    parseMessage: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getModelToken(Product.name),
          useValue: mockProductModel,
        },
        {
          provide: OpenAiService,
          useValue: mockOpenAiService,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    openAiService = module.get<OpenAiService>(OpenAiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    const createProductDto: CreateProductDto = {
      type: 'phone',
      description: 'new phone',
      brand: 'testBrand',
      color: 'red',
      lostTime: new Date(),
    };
  
    const savedProduct = {
      ...createProductDto,
      _id: 'a uuid',
      createdAt: new Date()
    };
  
    const result = await service.create(createProductDto);
    expect(result).toEqual(savedProduct);
  });

  it('should find all products', async () => {
    const product = {
      type: 'phone',
      description: 'new phone',
      brand: 'testBrand',
      color: 'red',
      lostTime: new Date(),
      _id: 'a uuid',
      createdAt: new Date(),
    };
  
    mockProductModel.find.mockReturnValue({
      exec: jest.fn().mockResolvedValue([product]),
    });
    
    const result = await service.findAll();
    expect(result).toEqual([product]);
  });
  
  it('should find a product by id', async () => {
    const product = {
      type: 'phone',
      description: 'new phone',
      brand: 'testBrand',
      color: 'red',
      lostTime: new Date(),
      _id: 'a uuid',
      createdAt: new Date(),
    };
  
    mockProductModel.findById.mockReturnValue({
      exec: jest.fn().mockResolvedValue(product),
    });
    const result = await service.findById('testId');
    expect(result).toEqual(product);
  });
  
  it('should update a product', async () => {
    const updateProductDto: UpdateProductDto = {
      description: 'updated description',
    };
  
    const updatedProduct = {
      type: 'phone',
      description: 'updated description',
      brand: 'testBrand',
      color: 'red',
      lostTime: new Date(),
      _id: 'a uuid',
      createdAt: new Date(),
    };
  
    mockProductModel.findByIdAndUpdate.mockReturnValue({
      exec: jest.fn().mockResolvedValue(updatedProduct),
    });
    const result = await service.update('testId', updateProductDto);
    expect(result).toEqual(updatedProduct);
  });
  
  it('should delete a product', async () => {
    const product = {
      type: 'phone',
      description: 'new phone',
      brand: 'testBrand',
      color: 'red',
      lostTime: new Date(),
      _id: 'a uuid',
      createdAt: new Date(),
    };
  
    mockProductModel.findByIdAndRemove.mockReturnValue({
      exec: jest.fn().mockResolvedValue(product),
    });
    const result = await service.delete('testId');
    expect(result).toEqual(product);
  });

  it('should search for products', async () => {
    const searchProductDto: SearchProductDto = {
      message: 'phone',
      lostTime: '2023-05-01',
    };
    const context = {
      type: 'phone',
      brand: '',
      color: '',
    };
    const product = {
      type: 'phone',
      description: 'new phone',
      brand: 'testBrand',
      color: 'red',
      lostTime: new Date(),
    } as ProductDocument;
    
    mockOpenAiService.parseMessage.mockResolvedValue(context);
    mockProductModel.find.mockResolvedValue([product]);
    const result = await service.search(searchProductDto);
    expect(result).toEqual([product]);
  });
});

