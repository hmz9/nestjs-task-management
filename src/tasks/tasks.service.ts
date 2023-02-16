import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { stat } from 'fs';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TaskRepository) {}

  getTasks(getTaskDto: GetTaskDto) {}

  async getTaskById(id: number): Promise<Task> {
    return this.taskRepository.getTaskById(id);
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.taskRepository.createTask(createTaskDto);
  }
  async searchTasks(getTaskDto: GetTaskDto): Promise<Task[]> {
    return this.taskRepository.searchTasks(getTaskDto);
  }
  async deleteTask(id: number): Promise<string> {
    return this.taskRepository.deleteTask(id);
  }
  async updateTask(id: number, status: TaskStatus): Promise<Task> {
    return this.taskRepository.updateTask(id, status);
  }
}
