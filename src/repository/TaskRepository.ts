import { Repository } from 'typeorm';
import { banco } from '../../banco';
import { Task } from '../entity/Task';

export class TaskRepository {
    private repository: Repository<Task>;

    constructor() {
        this.repository = banco.getRepository(Task);
    }

    async save(task: Task): Promise<Task> {
        return await this.repository.save(task);
    }

    async findAll(): Promise<Task[]> {
        return await this.repository.find();
    }

    async findById(id: number): Promise<Task | null> {
        return await this.repository.findOne({
            where: { id: id },
            relations: ['users', 'project'],
        });
    }

    async find(task: Partial<Task>): Promise<Task | null> {
        return await this.repository.findOne({where : task});
    }

    async update(id: number, task: Partial<Task>): Promise<void> {
        await this.repository.update(id, task);
    }

    async delete(task: Task): Promise<Task> {
        return await this.repository.remove(task);
    }
}