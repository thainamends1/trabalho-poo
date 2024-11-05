import { Task } from "../entity/Task";
import { TaskRepository } from "../repository/TaskRepository";

export class TaskService {

    private taskRepository: TaskRepository;

    constructor() {
        this.taskRepository = new TaskRepository();
    }

    async create(task: Task): Promise<Task> {
        return await this.taskRepository.create(task);
    }   
    
    async read(): Promise<Task[]> {
        return await this.taskRepository.read();
    }

    async update(id: number, task: Partial<Task>): Promise<void>{
        await this.taskRepository.update(id, task);
    }

    async delete(id: number): Promise<boolean> {
        const task = await this.taskRepository.find({ id: id });

        if (!task) {
            return false;
        }

        await this.taskRepository.delete(task);
        return true;
    }

    // ---------------------------------------------------------------------------------------

}