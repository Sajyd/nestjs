import { OmitType, ApiProperty } from '@nestjs/swagger'
import { IsArray, IsString } from 'class-validator'

export class CreateTaskInput {
  @IsString()
  @ApiProperty()
  name: string

  @IsString()
  @ApiProperty()
  description: string
}

export class UpdateTaskInput extends CreateTaskInput {}