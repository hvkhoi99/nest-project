import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Task, TaskStatus } from './task.model.';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: uuid(),
      title: 'default',
      description: 'default',
      status: TaskStatus.OPEN,
    },
    {
      id: uuid(),
      title: 'title',
      description: 'description',
      status: TaskStatus.IN_PROGRESS,
    },
  ];

  getTasksService() {
    return this.tasks;
  }

  getTasksFilterService(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getTasksService();

    if (status) {
      tasks = tasks.filter(
        (task) => task.status.toLowerCase() === status.toLowerCase(),
      );
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase())
        )
          return true;
        return false;
      });
    }

    return tasks;
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
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskStatusService(id: string, status: TaskStatus) {
    const task = this.getTaskServiceById(id);
    task.status = status;
    return task;
  }
}
