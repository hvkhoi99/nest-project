import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model.';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasksController(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksFilterService(filterDto);
    }
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

  @Patch('/:id/status')
  updateTaskStatusController(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskStatusService(id, status);
  }
}
