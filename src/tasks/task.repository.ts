import { NotFoundException } from '@nestjs/common';
import { Injectable, Inject } from '@nestjs/common';
import { stat } from 'fs';
import { DataSource, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.find({});
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;

    const result = await this.save(task);

    return result;
  }

  async deleteTask(id: number): Promise<string> {
    const result = await this.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ${id} not found`);
    }

    return 'Task deleted Succesfully';
  }

  async updateTask(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    if (!task) {
      throw new NotFoundException(`Task with ${id} not found`);
    }

    task.status = status;
    return this.save(task);
  }

  async searchTasks(getTaskDto: GetTaskDto): Promise<Task[]> {
    const { status, search } = getTaskDto;

    let tasks = [];

    if (status) {
      tasks = await this.find({ where: { status } });
    }

    if (search) {
      // tasks = await this.find({where: {status}});
    }

    return tasks;
  }
}
