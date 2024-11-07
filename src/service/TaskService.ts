import { Task } from "../entity/Task";
import { User } from "../entity/User";
import { ProjectRepository } from "../repository/ProjectRepository";
import { TaskRepository } from "../repository/TaskRepository";
import { UserRepository } from "../repository/UserRepository";

export class TaskService {

    private taskRepository: TaskRepository;
    private userRepository: UserRepository;
    private projectRepository: ProjectRepository;

    constructor() {
        this.taskRepository = new TaskRepository();
        this.userRepository = new UserRepository();
        this.projectRepository = new ProjectRepository();
    }

    async create(task: Task): Promise<Task> {
        return await this.taskRepository.save(task);
    }   
    
    async read(): Promise<Task[]> {
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


    // // Regra de negócio aqui, será realizado teste de verificação depois
    // async assignTaskToUser(taskId: number, userId: number): Promise<void> {
    //     // Busca o usuário e a tarefa
    //     const user = await this.userRepository.findOne({
    //         where: { id: userId }, 
    //         relations: ['tasks']
    //     });

    //     const task = await this.taskRepository.findOne({
    //         where: { id: taskId },
    //         relations: ['users']
    //     });

    //     if (!user) throw new Error('Usuário não encontrado.');
    //     if (!task) throw new Error('Tarefa não encontrada.');

    //     // Adiciona a tarefa ao usuário e salva
    //     user.tasks.push(task);
    //     await this.userRepository.save(user);
    // }

    // -------------------- Relacionamento com o Projeto ---------------------------------
    // Para listar o relacionamento MANY TO ONE com Projeto
    async listTasksByProject(projectId: number): Promise<Task[]> {
        const project = await this.projectRepository.findByIdWithTasks(projectId);
        return project ? project.tasks : [];
    }

    // -------------------- Relacionamento com o Usuário ---------------------------------
    // Para listar o relacionamento MANY TO MANY com Usuario
    async listTaskUsers(taskId: number): Promise<User[]> {
        const task = await this.taskRepository.findByIdWithUsers(taskId);
        return task ? task.users : [];
    }
}