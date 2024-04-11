import { PartialType } from '@nestjs/swagger'
import { User } from './user.schema'

export class UserPayload extends PartialType(User) {
    id?: string;
    createdAt?: string
    updateAt?: string
}