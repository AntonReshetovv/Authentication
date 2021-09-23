import { forwardRef, Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  exports: [AuthenticationService, JwtModule],
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: '10h',
      },
    }),
  ],
})
export class AuthenticationModule {}
