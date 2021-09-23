import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthenticationJwtGuard } from '../authentication/authentication-jwt.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @UseGuards(AuthenticationJwtGuard)
  @Get()
  getAllUsers() {
    return this.userService.getAllUser();
  }
}
