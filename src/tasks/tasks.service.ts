import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuidv1 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { stat } from 'fs';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const result = this.tasks.find((task) => task.id === id);

    if (!result) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return result;
  }

  searchTasks(getTaskDto: GetTaskDto): Task[] {
    const { search, status } = getTaskDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuidv1(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): string {
    const result = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== result.id);
    return 'Task deleted Succesfully';
  }

  updateTask(id: string, status: TaskStatus): Task {
    let indexUpdated = -1;
    this.tasks.forEach((task, index) => {
      if (task.id === id) {
        this.tasks[index].status = status;
        indexUpdated = index;
      }
    });
    if (indexUpdated != -1) {
      return this.tasks[indexUpdated];
    }
  }
}
