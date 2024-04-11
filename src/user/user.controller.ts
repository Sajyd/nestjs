import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { Public } from 'src/auth/public-strategy'
import { CreateUserInput } from './user.input'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() body: CreateUserInput) {
    return this.userService.createUser(body)
  }

  @Get()
  listUser() {
    return this.userService.listUser()
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.userService.findUser(id)
  }

  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() body: CreateUserInput) {
    return this.userService.updateUser(id, body)
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id)
  }
}