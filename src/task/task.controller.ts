import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards, } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.schema';
import { CreateTaskInput } from './task.input';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/user.decorator';
  
@Controller('tasks')
export class TaskController {

    constructor(private readonly taskService: TaskService) {}

    @UseGuards(AuthGuard)
    @Post()
    createTask(@User() user: any, @Body() data: CreateTaskInput) {
      return this.taskService.createTask(user, data);
    }

    @UseGuards(AuthGuard)
    @Get()
    listTask() {
      return this.taskService.listtask();
    }

    @UseGuards(AuthGuard)
    @Get('/:id')
    findTask(@Param('id') id: string) {
      return this.taskService.findTask(id);
    }
    @Patch('/:id')
    updateTask(@Param('id') id: string, @Body() data: Task) {
      return this.taskService.updatetask(id, data);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    deleteTask(@Param('id') id: string) {
      return this.taskService.deletetask(id);
    }

    @UseGuards(AuthGuard)
    @Patch('/:id/add-user/:userId')
    addUser(@Param('id') taskId: string, @Param('userId') userId: string) {
      return this.taskService.addUser(taskId, userId);
    }

    @UseGuards(AuthGuard)
    @Patch('/:id/remove-user/:userId')
    removeUser(@Param('id') taskId: string, @Param('ownerId') userId: string) {
      return this.taskService.removeUser(taskId, userId);
    }

    @UseGuards(AuthGuard)
    @Get('/:id/users')
    getOwners(@Param('id') taskId: string) {
      return this.taskService.getUsers(taskId);
    }
}