import { Task } from "../entity/Task";
import { TaskRepository } from "../repository/TaskRepository";

export class TaskService {

    private taskRepository: TaskRepository;
    constructor() {
        this.taskRepository = new TaskRepository();
    }

    async create(task: Task): Promise<Task> {
        return await this.taskRepository.save(task);
    }   
    
    async list(): Promise<Task[]> {
        return await this.taskRepository.findAll();
    }

    async update(id: number, task: Partial<Task>): Promise<void>{
        await this.taskRepository.update(id, task);
    }

    async delete(id: number): Promise<boolean> {
        const task = await this.taskRepository.findById(id);

        if (!task) {
            return false;
        }

        await this.taskRepository.delete(task);
        return true;
    }

    async findById(id: number): Promise<Task | null> {
        const task = await this.taskRepository.findById(id);
        if (!task) {
            throw new Error(`Tarefa com ID ${id} não encontrada.`);
        }
        return task;
    }
}