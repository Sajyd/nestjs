import { Injectable, NotFoundException, Request } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { create } from 'domain';
import { Model } from 'mongoose';
import { CreateTaskInput, UpdateTaskInput } from './task.input';
import { TaskPayload } from './task.payload';
import { Task } from './task.schema';

@Injectable()
export class TaskService {
constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async createTask(user, body: CreateTaskInput): Promise<TaskPayload> {
    const createdTask = new this.taskModel(body)
    createdTask.owner = user;
    const task = await createdTask.save()
    return task
  }

  async findTask(id: string): Promise<TaskPayload> {
    const task = await this.taskModel.findOne({ _id: id }).exec()

    if (!task) {
      throw new NotFoundException(`Task with id:${id} not found `)
    }
    return task
  }

  async listtask(): Promise<TaskPayload[]> {
    const tasks = await this.taskModel.find()
    return tasks
  }

  async updatetask(id: string, body: UpdateTaskInput): Promise<TaskPayload> {
    await this.taskModel.updateOne({ _id: id }, body)
    const updatedtask = this.taskModel.findById(id)
    return updatedtask
  }

  async deletetask(id: string): Promise<void> {
    await this.taskModel.deleteOne({ _id: id })
  }

  async addUser(taskId: string, userId: string) {
    const task = await this.taskModel.findOne({ _id: taskId }).exec()

    if (!task) {
      throw new NotFoundException(`Task with id:${taskId} not found `)
    }

    return await this.taskModel.findByIdAndUpdate(
      taskId,
      { $addToSet: { users: userId } },
      { new: true },
    );
  }

  async removeUser(taskId: string, userId: string) {
    return this.taskModel.findByIdAndUpdate(
      taskId,
      { $pull: { owners: userId } },
      { new: true },
    );
  }
  async getUsers(taskId: string) {
    const task = await this.taskModel.findById(taskId).populate('owners');
    return task.users;
  }

}
