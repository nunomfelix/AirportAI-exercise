import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  const mockUserService = {
    findAll: jest.fn().mockResolvedValue([
      {
        username: 'testUser1',
        password: 'password1',
        role: 'AGENT',
        createdAt: new Date(),
      },
      {
        username: 'testUser2',
        password: 'password2',
        role: 'AGENT',
        createdAt: new Date(),
      },
    ]),
    findById: jest.fn().mockImplementation((id: string) => ({
      username: 'testUser1',
      password: 'password1',
      role: 'AGENT',
      createdAt: new Date(),
      _id: id,
    })),
    delete: jest.fn().mockImplementation((id: string) => ({
      username: 'testUser1',
      password: 'password1',
      role: 'AGENT',
      createdAt: new Date(),
      _id: id,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should find all users', async () => {
    const users = await userController.findAll();
    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          username: expect.any(String),
          password: expect.any(String),
          role: expect.any(String),
          createdAt: expect.any(Date),
        }),
      ]),
    );
  });

  it('should find user by id', async () => {
    const user = await userController.findById('testId');
    expect(user).toEqual(
      expect.objectContaining({
        username: expect.any(String),
        password: expect.any(String),
        role: expect.any(String),
        createdAt: expect.any(Date),
        _id: 'testId',
      }),
    );
  });

  it('should delete a user', async () => {
    const deletedUser = await userController.delete('testId');
    expect(deletedUser).toEqual(
      expect.objectContaining({
        username: expect.any(String),
        password: expect.any(String),
        role: expect.any(String),
        createdAt: expect.any(Date),
        _id: 'testId',
      }),
    );
  });
});
