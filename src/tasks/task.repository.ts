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

  async getTasks(getTaskDto: GetTaskDto): Promise<Task[]> {
    const { search, status } = getTaskDto;

    const query = this.createQueryBuilder('task');

    if(status){
      query.andWhere('task.status = :status', { status });
    }

    if(search){
      query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` });
    }

    const tasks = await query.getMany();

    return tasks;
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

}
