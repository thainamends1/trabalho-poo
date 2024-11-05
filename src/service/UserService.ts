import { Project } from "../entity/Project";
import { Task } from "../entity/Task";
import { User } from "../entity/User";
import { ProjectRepository } from "../repository/ProjectRepository";
import { TaskRepository } from "../repository/TaskRepository";
import { UserRepository } from "../repository/UserRepository";

export class UserService {

    private userRepository: UserRepository;
    private projectRepository: ProjectRepository;
    private taskRepository: TaskRepository;

    constructor() {
        this.userRepository = new UserRepository();
        this.projectRepository = new ProjectRepository();
        this.taskRepository = new TaskRepository();
    }

    async create(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }
    
    async read(): Promise<User[]> {
        return await this.userRepository.findAll();
    }

    async update(id: number, user: Partial<User>): Promise<void>{
        await this.userRepository.update(id, user);
    }

    async delete(id: number): Promise<boolean> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            return false;
        }

        await this.userRepository.delete(user);
        return true;
    }

    // ------------------- Relacionamento com Projetos --------------------------
    // Para listar o relacionamento MANY TO MANY com Projeto
    async listUserProjects(userId: number): Promise<Project[]> {
        const user = await this.userRepository.findByIdWithProjects(userId);
        return user ? user.projects : [];
    }

    // ------------------- Relacionamento com Tarefas --------------------------
    // Para listar o relacionamento MANY TO MANY com Tarefa
    async listUserTasks(userId: number): Promise<Task[]> {
        const user = await this.userRepository.findByIdWithTasks(userId);
        return user ? user.tasks : [];
    }

    // ------------------- Relacionamento com Comentarios --------------------------
    // Para listar o relacionamento ONE TO MANY com Comentario

}