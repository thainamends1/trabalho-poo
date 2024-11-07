import { Project } from "../entity/Project";
import { Task } from "../entity/Task";
import { User } from "../entity/User";
import { ProjectRepository } from "../repository/ProjectRepository";
import { TaskRepository } from "../repository/TaskRepository";
import { UserRepository } from "../repository/UserRepository";

export class ProjectService {

    private projectRepository: ProjectRepository;
    private taskRepository: TaskRepository;
    private userRepository: UserRepository

    constructor() {
        this.projectRepository = new ProjectRepository();
        this.taskRepository = new TaskRepository();
        this.userRepository = new UserRepository();
    }

    async create(project: Project): Promise<Project> {
        return await this.projectRepository.save(project);
    }   
    
    async read(): Promise<Project[]> {
        return await this.projectRepository.findAll();
    }

    async update(id: number, project: Partial<Project>): Promise<void>{
        await this.projectRepository.update(id, project);
    }

    async delete(id: number): Promise<boolean> {
        const project = await this.projectRepository.findById(id);

        if (!project) {
            return false;
        }

        await this.projectRepository.delete(project);
        return true;
    }

    async findById(id: number): Promise<Project | null> {
        const project = await this.projectRepository.findById(id);
        if (!project) {
            throw new Error(`Projeto com ID ${id} não encontrado.`);
        }
        return project;
    }

    async finalizeProject(projectId: number): Promise<boolean> {
        const project = await this.projectRepository.findByIdWithTasks(projectId);

        if (!project) {
            throw new Error("Projeto não encontrado.");
        }

        // Verificar se todas as tarefas estão completas
        const allTasksComplete = project.tasks.every(task => task.isCompleted);

        if (!allTasksComplete) {
            throw new Error("O projeto não pode ser finalizado pois há tarefas pendentes.");
        }

        // Atualizar o status do projeto para finalizado
        project.isCompleted = true;
        await this.projectRepository.save(project);
        
        return true;
    }

}