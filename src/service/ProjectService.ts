import { Project } from "../entity/Project";
import { ProjectRepository } from "../repository/ProjectRepository";

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

    // Método para verificar a regra de negócio:
    // -> um projeto só pode ser finalizado se possuir TODAS as suas tarefas vinculadas concluídas.
    async finalizeProject(projectId: number): Promise<boolean> {
        // Carregar o projeto e suas tarefas associadas
        const project = await this.projectRepository.findProjectWithTasks(projectId);
    
        if (!project) {
            throw new Error("Projeto não encontrado.");
        }
    
        console.log(project.tasks)
        // Verificar se todas as tarefas vinculadas ao projeto estão concluídas
        const allTasksComplete = project.tasks.length > 0 && project.tasks.every(task => task.isCompleted);
    
        // Se alguma tarefa não estiver completa, impede a finalização
        if (!allTasksComplete) {
            return false; // Retorna false indicando que o projeto não pode ser finalizado
        }
    
        // Atualizar o status do projeto para finalizado
        project.isCompleted = true;
        await this.projectRepository.save(project);
        
        return true;
    }
}