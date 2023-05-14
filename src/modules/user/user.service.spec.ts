import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { UserRegisterDto } from '../auth/dto/user-register.dto';
import { BadRequestException } from '@nestjs/common';

describe('UserService', () => {
  let userService: UserService;
  let userModel: any;

  const mockUserModel = () => {
    const mockedUserModel = function(data) {
      this.data = data;
      this.save = jest.fn().mockResolvedValue(this);
    };

    mockedUserModel.find = jest.fn().mockReturnThis();
    mockedUserModel.findById = jest.fn().mockReturnThis();
    mockedUserModel.findByIdAndRemove = jest.fn().mockReturnThis();
    mockedUserModel.findOne = jest.fn().mockReturnThis();
    mockedUserModel.exec = jest.fn();

    return mockedUserModel;
  };

  beforeEach(async () => {
    userModel = mockUserModel();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: userModel,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should find all users', async () => {
    const users = [];
    userModel.find().exec.mockResolvedValue(users);
    const result = await userService.findAll();
    expect(result).toEqual(users);
    expect(userModel.find).toHaveBeenCalled();
  });

  it('should find user by id', async () => {
    const testId = 'testId';
    const user = new User();
    userModel.findById().exec.mockResolvedValue(user);
    const result = await userService.findById(testId);
    expect(result).toEqual(user);
    expect(userModel.findById).toHaveBeenCalledWith(testId);
  });

  it('should delete a user', async () => {
    const testId = 'testId';
    const user = new User();
    userModel.findByIdAndRemove().exec.mockResolvedValue(user);
    const result = await userService.delete(testId);
    expect(result).toEqual(user);
    expect(userModel.findByIdAndRemove).toHaveBeenCalledWith(testId);
  });

  it('should find user by username', async () => {
    const testUsername = 'testUsername';
    const user = new User();
    userModel.findOne().exec.mockResolvedValue(user);
    const result = await userService.findByUsername(testUsername);
    expect(result).toEqual(user);
    expect(userModel.findOne).toHaveBeenCalledWith({ username: testUsername });
  });

  it('should throw error when creating an existing user', async () => {
    const user = new User();
    userModel.findOne().exec.mockResolvedValue(user);
    const userRegisterDto: UserRegisterDto = {
      username: 'testUsername',
      password: 'testPassword',
    };
    await expect(userService.create(userRegisterDto)).rejects.toThrow(BadRequestException);
  });

  it('should create a new user', async () => {
    userModel.findOne().exec.mockResolvedValue(null);
    const userRegisterDto: UserRegisterDto = {
      username: 'testUsername',
      password: 'testPassword',
    };
    const user = new userModel(userRegisterDto);
    user.save.mockResolvedValue(user);
    const result = await userService.create(userRegisterDto);
    expect(result.username).toEqual(user.username);
});
});
