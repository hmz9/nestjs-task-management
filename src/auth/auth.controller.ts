import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signup(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<string> {
    return this.authService.signup(authCredentialsDto);
  }

  @Put('/signin')
  async signin(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<string> {
    return this.authService.signin(authCredentialsDto);
  }
}
