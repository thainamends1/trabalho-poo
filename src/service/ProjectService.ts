import { Project } from "../entity/Project";
import { ProjectRepository } from "../repository/ProjectRepository";
import { UserRepository } from "../repository/UserRepository";

export class ProjectService {

    private projectRepository: ProjectRepository;

    constructor() {
        this.projectRepository = new ProjectRepository();
    }

    //  Lista todos os projetos
    async list(): Promise<Project[]> {
        return await this.projectRepository.findAll();
    }

    //  Cria novo projeto
    async create(project: Project): Promise<Project> {
        return await this.projectRepository.save(project);
    }

    // Atualiza um projeto existente
    async update(id: number, project: Partial<Project>): Promise<void>{
        await this.projectRepository.update(id, project);
    }

    // Deleta um projeto
    async delete(id: number): Promise<boolean> {
        const project = await this.projectRepository.findById(id);

        if (!project) {
            return false;
        }

        await this.projectRepository.delete(project);
        return true;
    }

    // Pesquisa por um projeto através da sua PK
    async findById(id: number): Promise<Project | null> {
        const project = await this.projectRepository.findById(id);
        if (!project) {
            throw new Error(`Projeto com ID ${id} não encontrado.`);
        }
        return project;
    }

    async finalizeProject(projectId: number): Promise<boolean> {
        // Carrega as relações com as tarefas associadas
        const project = await this.projectRepository.findByIdWithTasks(projectId);
    
        if (!project) {
            throw new Error("Projeto não encontrado.");
        }
    
        // Verifica se todas as tarefas do projeto estão TRUE (concluídas)
        const allTasksComplete = project.tasks.every(task => task.isCompleted);
    
        if (!allTasksComplete) {
            throw new Error("Erro ao finalizar projeto: todas as tarefas precisam estar completas.");
        }
    
        // Se todas as tarefas estiverem concluídas, deixa o programa ser finalizado (isCompleted = TRUE)
        project.isCompleted = true;
        await this.projectRepository.save(project);
    
        return true;
    }
}