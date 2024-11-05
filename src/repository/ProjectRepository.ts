import { Repository } from 'typeorm';
import { banco } from '../../banco';
import { Project } from '../entity/Project';

export class ProjectRepository {
    private repository: Repository<Project>;

    constructor() {
        this.repository = banco.getRepository(Project);
    }

    // Criar um projeto
    async create(project: Project): Promise<Project> {
        return await this.repository.save(project);
    }

    // Salvar um projeto
    async save(project: Project): Promise<Project> {
        return await this.repository.save(project);
    }

    // Listar projetos
    async list(): Promise<Project[]> {
        return await this.repository.find();
    }

    // Para listar o relacionamento ONE TO MANY com Tarefa
    public async listProjectTask(): Promise<Project[]> {
        return await this.repository.find({
            relations: ["tasks"],
        });
    }

    // Para listar o relacionamento MANY TO MANY com Usuario
    async listProjectUser(): Promise<Project[]> {
        return await this.repository.find({
            relations: ["users"],
        });
    }

    // Atualiza os dados de projeto
    async update(id: number, project: Partial<Project>): Promise<void> {
        await this.repository.update(id, project);
    }

    // Deleta um projeto do repositório
    async delete(project: Project): Promise<Project> {
        return await this.repository.remove(project);
    }

    // Busca um projeto no repositório ao ser passado algum atributo
    async find(project: Partial<Project>): Promise<Project | null> {
        return await this.repository.findOne({where : project});
    }
    
    // Busca um projeto no repositório através da PK dele
    async findById(id: number): Promise<Project> {
        return await this.repository.findOneBy({id: id});
    }

    // ------------------- Relacionamento com Usuários -------------------------

    // Buscar um projeto pelo ID com os usuários relacionados
    async findByIdWithUsers(projectId: number): Promise<Project | null> {
        return await this.repository.findOne({
            where: { id: projectId },
            relations: ['users']
        });
    }

    // ------------------- Relacionamento com Tarefas --------------------------

}