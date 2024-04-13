import { PartialType } from '@nestjs/swagger'
import { ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/user.schema';
import { Task } from './task.schema'

export class TaskPayload extends PartialType(Task) {
    createdAt?: string
    updateAt?: string
}