import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { UserRegisterDto } from '../auth/dto/user-register.dto';
import { generateHash } from '../../core/common/utils';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userRegisterDto: UserRegisterDto): Promise<User> {
    const { username } = userRegisterDto;

    const user = await this.findByUsername(username);
    if (!!user) {
      throw new BadRequestException('User exists already!');
    }

    const hashedPassword = await generateHash(userRegisterDto.password);
    const createdUser = new this.userModel({
      ...userRegisterDto,
      password: hashedPassword,
    });
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndRemove(id).exec();
  }

  async findByUsername(username: string): Promise<UserDocument> {
    return this.userModel.findOne({ username: username }).exec();
  }
}
