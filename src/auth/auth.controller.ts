import { Body, Controller, Post, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
//import { User } from "src/dto/user/base-user.dto";
import { Public } from "./public-strategy";
import { CreateUserInput } from "src/user/user.input";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("login")
  @ApiOperation({ summary: "User Login" })
  @ApiResponse({
    status: 200,
    description: "The record found",
    type: [CreateUserInput],
  })
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("signup")
  @ApiOperation({ summary: "User Signup" })
  @ApiResponse({
    status: 200,
    description: "The record found",
    type: [CreateUserInput],
  })
  signUp(@Body() signUpDto: Record<string, any>) {
    const payload = {
      name: signUpDto.username, 
      email: signUpDto.email, 
      password: signUpDto.password,
    }
    return this.authService.signUp(payload);
  }
}