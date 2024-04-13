import { Injectable, NotFoundException, Request } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { create } from 'domain';
import { Model } from 'mongoose';
import { User } from 'src/user/user.schema';
import { CreateTaskInput, UpdateTaskInput } from './task.input';
import { TaskPayload } from './task.payload';
import { Task } from './task.schema';

@Injectable()
export class TaskService {
constructor(@InjectModel(Task.name) private taskModel: Model<Task>, @InjectModel(User.name) private userModel: Model<User>) {}

  async createTask(user: any, body: CreateTaskInput): Promise<TaskPayload> {
    const ownerDoc = await this.userModel.findById(user.sub)
    const createdTask = new this.taskModel({
      ...body,
      owner: ownerDoc,
    })
    const task = await createdTask.save()
    return task
  }

  async findTask(user: any, id: string): Promise<TaskPayload> {
    const task = await this.taskModel.findById(id).exec()
    if (!task) {
      throw new NotFoundException(`Task with id:${id} not found `)
    }
    if (task.owner.toString() != user.sub && !(user.sub in task.users)) {
      throw new NotFoundException(`User is not authorized to see this task`)
    }
    return task
  }

  async listtask(user: any): Promise<TaskPayload[]> {
    const tasks = await this.taskModel.find({$or: [{users: user.sub}, {owner: user.sub}]})
    return tasks
  }

  async updatetask(user: any, taskId: string, body: UpdateTaskInput): Promise<TaskPayload> {
    const task = await this.taskModel.findById(taskId)
    if (!task) {
      throw new NotFoundException(`Task with id:${taskId} not found `)
    }
    if (task.owner.toString() != user.sub && !(user.sub in task.users)) {
      throw new NotFoundException(`Only owner can add update task`)
    }
    await this.taskModel.updateOne({ _id: taskId }, body)
    return this.taskModel.findById(taskId)

  }

  async deletetask(user: any, taskId: string): Promise<void> {
    const task = await this.taskModel.findById(taskId)
    if (!task) {
      throw new NotFoundException(`Task with id:${taskId} not found `)
    }
    if (task.owner.toString() != user.sub) {
      throw new NotFoundException(`Only owner can delete task`)
    }
    await this.taskModel.deleteOne({ _id: taskId })
  }

  async addUser(user: any, taskId: string, userId: string) {
    const task = await this.taskModel.findById(taskId)
    if (!task) {
      throw new NotFoundException(`Task with id:${taskId} not found `)
    }
    if (task.owner.toString() != user.sub) {
      throw new NotFoundException(`Only owner can add User`)
    }
    return await this.taskModel.findByIdAndUpdate(
      taskId,
      { $addToSet: { users: userId } },
      { new: true },
    );
  }

  async removeUser(user: any, taskId: string, userId: string) {
    const task = await this.taskModel.findById(taskId)
    if (!task) {
      throw new NotFoundException(`Task with id:${taskId} not found `)
    }
    if (task.owner.toString() != user.sub) {
      throw new NotFoundException(`Only owner can remove User`)
    }
    return this.taskModel.findByIdAndUpdate(
      taskId,
      { $pull: { users: userId } },
      { new: true },
    );
  }
  async getUsers(user: any, taskId: string) {
    const task = await this.taskModel.findById(taskId).populate('owners');
    return task.users;
  }

}
