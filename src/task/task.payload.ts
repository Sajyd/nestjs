import { PartialType } from '@nestjs/swagger'
import { Task } from './task.schema'

export class TaskPayload extends PartialType(Task) {
    id?: string;
    createdAt?: string
    updateAt?: string
    owner_id?: string
}