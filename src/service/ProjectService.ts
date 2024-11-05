import { Project } from "../entity/Project";
import { User } from "../entity/User";
import { ProjectRepository } from "../repository/ProjectRepository";
import { UserRepository } from "../repository/UserRepository";

export class ProjectService {

    private projectRepository: ProjectRepository;
    private userRepository: UserRepository;

    constructor() {
        this.projectRepository = new ProjectRepository();
        this.userRepository = new UserRepository();
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

    // -------------------- Relacionamento com o Usuário ---------------------------------
    
    // Adicionar um usuário ao projeto
    async addUserToProject(projectId: number, userId: number): Promise<void> {
        const project = await this.projectRepository.findByIdWithUsers(projectId);
        const user = await this.userRepository.findByIdWithProjects(userId);

        if (!project || !user) {
            throw new Error("Projeto ou usuário não encontrado.");
        }

        // Verifica se o usuário já pertence ao projeto
        const isUserInProject = project.users.some((u) => {
            u.id === userId;
        });

        if (isUserInProject) {
            throw new Error("Usuário já está no projeto.");
        }

        // Adiciona e salva, respectivamente, o usuário no projeto
        project.users.push(user);
        await this.projectRepository.save(project);
    }

     // Remover um usuário de um projeto
     async removeUserFromProject(projectId: number, userId: number): Promise<void> {
        const project = await this.projectRepository.findByIdWithUsers(projectId);

        if (!project) {
            throw new Error("Projeto não encontrado.");
        }

        project.users = project.users.filter((user) => user.id !== userId);
        await this.projectRepository.save(project);
    }

    // Listar usuários de um projeto
    async listUsersInProject(projectId: number): Promise<User[]> {
        const project = await this.projectRepository.findByIdWithUsers(projectId);
      
        if (project) {
          return project.users;
        } else {
          throw new Error("Projeto não encontrado.");
        }
      }
    
    // -------------------- Relacionamento com a Tarefa ---------------------------------
}