import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task } from './task.model.';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasksController() {
    return this.tasksService.getTasksService();
  }

  @Get('/:id')
  getTaskControllerById(@Param('id') id: string): Task {
    return this.tasksService.getTaskServiceById(id);
  }

  @Post()
  createTaskController(@Body() createTaskDTO: CreateTaskDTO) {
    return this.tasksService.createTaskService(createTaskDTO);
  }

  @Delete(':id')
  deleteTaskController(@Param('id') id: string) {
    return this.tasksService.deleteTaskService(id);
  }
}
