import { Repository } from 'typeorm';
import { banco } from '../../banco';
import { Project } from '../entity/Project';

export class ProjectRepository {
    private repository: Repository<Project>;

    constructor() {
        this.repository = banco.getRepository(Project);
    }

    async save(project: Project): Promise<Project> {
        return await this.repository.save(project);
    }

    // Read
    async findAll(): Promise<Project[]> {
        return await this.repository.find();
    }

    async findById(id: number): Promise<Project> {
        return await this.repository.findOneBy({id: id});
    }

    async find(project: Partial<Project>): Promise<Project | null> {
        return await this.repository.findOne({where : project});
    }

    async update(id: number, project: Partial<Project>): Promise<void> {
        await this.repository.update(id, project);
        // return this.findById(id);   // Retorna o objeto atualizado
    }

    async delete(project: Project): Promise<Project> {
        return await this.repository.remove(project);
    }

    // ------------------- Relacionamento com Tarefas --------------------------
    // Para listar o relacionamento ONE TO MANY com Tarefa
    async listProjectsWithTasks(): Promise<Project[]> {
        return await this.repository.find({
            relations: ["tasks"],
        });
    }

    async findByIdWithTasks(id: number): Promise<Project | null> {
        return await this.repository.findOne({
            where: { id: id },
            relations: ['tasks']
        });
    }

    // ------------------- Relacionamento com Usuários -------------------------
    // Para listar o relacionamento MANY TO MANY com Usuario
    async listProjectsWithUsers(): Promise<Project[]> {
        return await this.repository.find({
            relations: ["users"],
        });
    }

    async findByIdWithUsers(id: number): Promise<Project | null> {
        return await this.repository.findOne({
            where: { id: id },
            relations: ['users']
        });
    }
}