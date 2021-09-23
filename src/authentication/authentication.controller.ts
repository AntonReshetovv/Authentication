import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authenticationService.registration(userDto);
  }

  @Post('login')
  login(@Body() userDto: CreateUserDto) {
    return this.authenticationService.login(userDto);
  }
}
