import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import * as mongoose from 'mongoose';
import { User } from 'src/user/user.schema';

export type TaskDocument = HydratedDocument<Task>

@Schema({ collection: 'tasks', timestamps: true })
export class Task {
  
  @Prop()
  name: string

  @Prop()
  description: string

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  users: User[]

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User
}

export const TaskSchema = SchemaFactory.createForClass(Task)