import { Repository } from 'typeorm';
import { banco } from '../../banco';
import { Project } from '../entity/Project';

export class ProjectRepository {
    private repositorio: Repository<Project>;

    constructor() {
        this.repositorio = banco.getRepository(Project);
    }

    // Criar um projeto
    async create(project: Project): Promise<Project> {
        return await this.repositorio.save(project);
    }

    // Listar projetos
    async read(): Promise<Project[]> {
        return await this.repositorio.find();
    }

    // Para listar o relacionamento ONE TO MANY com Tarefa
    public async readProjectTask(): Promise<Project[]> {
        return await this.repositorio.find({
            relations: ["tasks"],
        });
    }

    // Para listar o relacionamento MANY TO MANY com Usuario
    async readProjectUser(): Promise<Project[]> {
        return await this.repositorio.find({
            relations: ["users"],
        });
    }

    // Buscar um projeto pelo ID com usuários relacionados
    async findByIdWithUsers(projectId: number): Promise<Project | null> {
        return await this.repositorio.findOne({
            where: { id: projectId },
            relations: ['users']
        });
    }

    // Atualiza os dados de projeto
    async update(id: number, project: Partial<Project>): Promise<void> {
        await this.repositorio.update(id, project);
    }

    // Deleta um projeto do repositório
    async delete(project: Project): Promise<Project> {
        return await this.repositorio.remove(project);
    }

    // Busca um projeto no repositório ao ser passado algum atributo
    async find(project: Partial<Project>): Promise<Project | null> {
        return await this.repositorio.findOne({where : project});
    }
    
    // Busca um projeto no repositório através da PK dele
    async findById(id: number): Promise<Project> {
        return await this.repositorio.findOneBy({id: id});
    }

    // ---------------------------------------------------------------------------

}