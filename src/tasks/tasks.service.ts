import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Task, TaskStatus } from './task.model.';
import { CreateTaskDTO } from './dto/create-task.dto';
import { response } from 'express';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasksService() {
    return this.tasks;
  }

  getTaskServiceById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTaskService(createTaskDTO: CreateTaskDTO): Task {
    const { title, description } = createTaskDTO;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  deleteTaskService(id: string) {
    try {
      this.tasks = this.tasks.filter((task) => task.id !== id);
      return response.status(200).json({
        status: 200,
        message: 'Delete task was successfully.',
        data: this.tasks,
      });
    } catch (error) {
      return response.status(400).json(error);
    }
  }
}
