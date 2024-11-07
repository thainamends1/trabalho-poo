import { Project } from "../entity/Project";
import { Task } from "../entity/Task";
import { User } from "../entity/User";
import { UserRepository } from "../repository/UserRepository";

export class UserService {

    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
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

    async findById(id: number): Promise<User | null> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error(`Usuário com ID ${id} não encontrado.`);
        }
        return user;
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