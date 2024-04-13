import { Module } from '@nestjs/common'
import { TaskService } from './task.service'
import { TaskController } from './task.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Task, TaskSchema } from './task.schema'
import { User, UserSchema } from 'src/user/user.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    MongooseModule.forFeatureAsync([
      { 
          name: User.name, 
          useFactory: () => {
              const schema = UserSchema;
              schema.plugin(require('mongoose-unique-validator'), { message: `Can't be duplicate` }); // or you can integrate it without the options   schema.plugin(require('mongoose-unique-validator')
              return schema;
            } 
      }
  ]),
  ],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}