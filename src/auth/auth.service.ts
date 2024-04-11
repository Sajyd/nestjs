import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from "src/user/user.input";

@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private jwtService: JwtService) {}
  async signIn(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async signUp(payload: CreateUserInput) {
    const user = await this.usersService.createUser(payload);
    return user;
  }
}