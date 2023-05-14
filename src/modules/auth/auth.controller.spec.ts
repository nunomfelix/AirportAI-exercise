import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';

type MockedAuthService = {
  validateUser: jest.MockedFunction<AuthService['validateUser']>;
  createAccessToken: jest.MockedFunction<AuthService['createAccessToken']>;
};

type MockedUserService = {
  create: jest.MockedFunction<UserService['create']>;
};

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const authServiceMock: MockedAuthService = {
      validateUser: jest.fn() as jest.MockedFunction<AuthService['validateUser']>,
      createAccessToken: jest.fn() as jest.MockedFunction<AuthService['createAccessToken']>,
    };
  
    const userServiceMock: MockedUserService = {
      create: jest.fn() as jest.MockedFunction<UserService['create']>,
    };
  
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthController,
        { provide: AuthService, useValue: authServiceMock },
        { provide: UserService, useValue: userServiceMock },
      ],
    }).compile();
  
    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('userLogin', () => {
    it('should return a token when login is successful', async () => {
      const userLoginDto: UserLoginDto = {
        username: 'test',
        password: 'test',
      };

      const user = {
        _id: 'userId',
        role: 'userRole',
      };

      const token = {
        expiresIn: 3600,
        accessToken: 'testToken',
      };

      (authService.validateUser as jest.Mock).mockResolvedValueOnce(user);
      (authService.createAccessToken as jest.Mock).mockResolvedValueOnce(token);

      const result = await authController.userLogin(userLoginDto);

      expect(authService.validateUser).toHaveBeenCalledWith(userLoginDto);
      expect(authService.createAccessToken).toHaveBeenCalledWith({
        userId: user._id,
        role: user.role,
      });
      expect(result.token).toEqual(token);
    });

    it('should throw an error when login fails', async () => {
      const userLoginDto: UserLoginDto = {
        username: 'test',
        password: 'test',
      };

      (authService.validateUser as jest.Mock).mockRejectedValueOnce(new HttpException('', 401));

      await expect(authController.userLogin(userLoginDto)).rejects.toThrow(
        HttpException,
      );
    });
  });

  describe('userRegister', () => {
    it('should create a new user when registration is successful', async () => {
      const userRegisterDto: UserRegisterDto = {
        username: 'test',
        password: 'test',
      };

      const user = {
        _id: 'userId',
        role: 'userRole',
      };

      (userService.create as jest.Mock).mockResolvedValueOnce(user);

      const result = await authController.userRegister(userRegisterDto);

      expect(userService.create).toHaveBeenCalledWith(userRegisterDto);
      expect(result).toEqual(user);
    });

    it('should throw an error when registration fails', async () => {
      const userRegisterDto: UserRegisterDto = {
        username: 'test',
        password: 'test',
      };

      (userService.create as jest.Mock).mockRejectedValueOnce(new HttpException('', 400));

      await expect(authController.userRegister(userRegisterDto)).rejects.toThrow(
        HttpException,
      );
    });
  });
});
