import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(
    username: string,
    email: string,
    password: string,
    phone: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
      phone,
    });
    return this.userRepository.save(newUser);
  }

  async registerDriver(
    username: string,
    email: string,
    password: string,
    phone: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newDriver = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
      phone,
    });
    return this.userRepository.save(newDriver);
  }

  async login(identifier: string, password: string) {
    const user = await this.userRepository.findOne({
      where: [{ email: identifier }, { username: identifier }],
    });
    if (!user) throw new Error('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid password');

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '1h' },
    );

    return { token, user };
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    return { success: true, user };
  }

  async updateProfile(
    id: number,
    username: string,
    email: string,
    phone: string,
  ) {
    console.log('📌 Log: กำลังอัปเดตข้อมูลในฐานข้อมูล ->', {
      id,
      username,
      email,
      phone,
    });

    const updateResult = await this.userRepository.update(id, {
      username,
      email,
      phone,
    });

    if (updateResult.affected === 0) {
      throw new Error('Update failed, user not found');
    }

    return this.getUserById(id);
  }
}
