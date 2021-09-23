import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/entity/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthenticationService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async registration(userDto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(userDto.password, 10);
    try {
      const newUser = await this.userService.createUser({
        ...userDto,
        password: hashPassword,
      });
      return this.generateToken(newUser);
    } catch (e) {
      if (e.code === '23505') {
        throw new HttpException(
          'Пользователь с таким email уже существует',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  async generateToken(user: UserEntity) {
    const payload = { userEmail: user.email, userId: user.id };
    console.log('Мой payload', payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const samePassword = await bcrypt.compare(userDto.password, user.password);
    if (user && samePassword) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Неправильный логин или пароль',
    });
  }
}
