import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RoleType } from '../../../shared/constants';

//Union between User and Document which includes built-in properties and methods from the Mongoose Document type, such as _id, save()
export type UserDocument = User & Document;

//decorator marks a class as a Mongoose schema
@Schema()
export class User {
  //decorator is used to mark the properties you want to include in the schema
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: RoleType, default: RoleType.AGENT })
  role: RoleType;

  @Prop({ default: Date.now })
  createdAt: Date;
}

//SchemaFactory.createForClass method is used to create a schema corresponding to the 'User' Class
export const UserSchema = SchemaFactory.createForClass(User);
