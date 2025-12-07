import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  findOne(arg0: number) {
    throw new Error('Method not implemented.');
  }
  findAll() {
    throw new Error('Method not implemented.');
  }
  remove(arg0: number) {
    throw new Error('Method not implemented.');
  }
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(email: string, password: string, name?: string) {
    const hashed = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({ email, password: hashed, name });
    return user;
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  findById(id: string) {
    return this.userModel.findById(id).exec();
  }

  // for admin seeding / utilities
  async makeAdmin(email: string) {
    return this.userModel.updateOne({ email }, { role: 'ADMIN' });
  }
}
