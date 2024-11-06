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

    // Read
    async findAll(): Promise<Task[]> {
        return await this.repository.find();
    }

    async findById(id: number): Promise<Task> {
        return await this.repository.findOneBy({id: id});
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

    
    // -------------------- Relacionamento com o Projeto ---------------------------------
    // Para listar o relacionamento MANY TO ONE com Projeto
    async listTasksWithProject(): Promise<Task[]> {
        return await this.repository.find({
            relations: ["project"],
        });
    }

    async findByIdWithProject(id: number): Promise<Task | null> {
        return await this.repository.findOne({
            where: { id: id },
            relations: ['project']
        });
    }

    // -------------------- Relacionamento com o Usuários ---------------------------------
    // Para listar o relacionamento MANY TO MANY com Usuario
    async listTasksWithUsers(): Promise<Task[]> {
        return await this.repository.find({
            relations: ["users"],
        });
    }

    // Buscar uma tarefa pelo ID com os usuários relacionados
    async findByIdWithUsers(id: number): Promise<Task | null> {
        return await this.repository.findOne({
            where: { id: id },
            relations: ['users']
        });
    }

    // -------------------- Relacionamento com o Comentários ---------------------------------
    // Para listar o relacionamento ONE TO MANY com Comentario
    async listTasksWithComments(): Promise<Task[]> {
        return await this.repository.find({
            relations: ["comments"],
        });
    }

    // Buscar uma tarefa pelo ID com os comentarios relacionados
    async findByIdWithComments(id: number): Promise<Task | null> {
        return await this.repository.findOne({
            where: { id: id },
            relations: ['comments']
        });
    }
}