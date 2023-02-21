import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private jwtSerivce: JwtService,
  ) {}

  async signup(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    return this.userRepository.signup(authCredentialsDto);
  }

  async signin(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validatePasswordAndSignIn(
      authCredentialsDto,
    );

    const payload: JwtPayload = { username };
    const accessToken = this.jwtSerivce.sign(payload);

    return { accessToken };
  }
}
