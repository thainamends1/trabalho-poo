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
    }

    async delete(project: Project): Promise<Project> {
        return await this.repository.remove(project);
    }

    // ------------------- Relacionamento com Tarefas --------------------------
    async findProjectWithTasks(id: number): Promise<Project | null> {
        return await this.repository.findOne({
            where: { id: id },
            relations: ['tasks'], // Carrega as tarefas do projeto
        });
    }
}