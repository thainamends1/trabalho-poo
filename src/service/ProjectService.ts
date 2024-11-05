import { Project } from "../entity/Project";
import { ProjectRepository } from "../repository/ProjectRepository";

export class ProjectService {

    private projectRepository: ProjectRepository;

    constructor() {
        this.projectRepository = new ProjectRepository();
    }

    async create(project: Project): Promise<Project> {
        return await this.projectRepository.create(project);
    }   
    
    async read(): Promise<Project[]> {
        return await this.projectRepository.read();
    }

    async update(id: number, project: Partial<Project>): Promise<void>{
        await this.projectRepository.update(id, project);
    }

    async delete(id: number): Promise<boolean> {
        const project = await this.projectRepository.find({ id: id });

        if (!project) {
            return false;
        }

        await this.projectRepository.delete(project);
        return true;
    }

    
    // ---------------------------------------------------------------------------------------
    
}