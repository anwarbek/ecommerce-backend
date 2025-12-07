import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async register(email: string, password: string, name?: string) {
    const exists = await this.usersService.findByEmail(email);
    if (exists) throw new UnauthorizedException('Email already exists');
    const user = await this.usersService.create(email, password, name);
    return this.generateTokens(user);
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');
    return this.generateTokens(user);
  }

  generateTokens(user: any) {
    const payload = { sub: user._id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
