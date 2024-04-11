import { OmitType, ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class CreateUserInput {
  @IsString()
  @ApiProperty()
  name: string

  @IsEmail()
  @ApiProperty()
  email: string

  @IsString()
  @ApiProperty()
  password: string
}

export class UpdateUserInput extends OmitType(CreateUserInput, [
  'password'
] as const) {}