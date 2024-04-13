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
    listTask(@User() user: any) {
      return this.taskService.listtask(user);
    }

    @UseGuards(AuthGuard)
    @Get('/:id')
    findTask(@User() user: any, @Param('id') id: string) {
      return this.taskService.findTask(user, id);
    }
    @Patch('/:id')
    updateTask(@User() user: any, @Param('id') id: string, @Body() data: Task) {
      return this.taskService.updatetask(user, id, data);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    deleteTask(@User() user: any, @Param('id') id: string) {
      return this.taskService.deletetask(user, id);
    }

    @UseGuards(AuthGuard)
    @Patch('/:id/add-user/:userId')
    addUser(@User() user: any, @Param('id') taskId: string, @Param('userId') userId: string) {
      return this.taskService.addUser(user, taskId, userId);
    }

    @UseGuards(AuthGuard)
    @Patch('/:id/remove-user/:userId')
    removeUser(@User() user: any, @Param('id') taskId: string, @Param('userId') userId: string) {
      return this.taskService.removeUser(user, taskId, userId);
    }

    @UseGuards(AuthGuard)
    @Get('/:id/users')
    getUsers(@User() user: any, @Param('id') taskId: string) {
      return this.taskService.getUsers(user, taskId);
    }
}