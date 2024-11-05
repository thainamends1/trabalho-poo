import { Request, Response } from 'express';
import { Project } from '../entity/Project';
import { ProjectService } from '../service/ProjectService';

export class ProjectController {
    private projectService: ProjectService;

    constructor() {
        this.projectService = new ProjectService();
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const project: Project = req.body;
            const newProject = await this.projectService.create(project);
            return res.status(201).json(newProject);
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao criar projeto.', error: error.message });
        }
    }

    async read(req: Request, res: Response): Promise<Response> {
        try {
            const projects = await this.projectService.read();
            return res.status(200).json(projects);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao listar projetos.', error: error.message });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            const project: Partial<Project> = req.body;
            await this.projectService.update(id, project);
            return res.status(200).json({ message: `Projeto com ID ${id} atualizado com sucesso.` });
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao atualizar projeto.', error: error.message });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id);
            const project = await this.projectService.delete(id);
            return res.status(200).json({ message: `Projeto com ID ${id} removido com sucesso.`, project });
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao remover projeto.', error: error.message });
        }
    }

    // ------------------------------------------------------------------------------

    // Endpoint para adicionar usuário ao projeto
    async addUserToProject(req: Request, res: Response): Promise<void> {
        const { userId, projectId } = req.body;
        try {
            await this.projectService.addUserToProject(userId, projectId);
            res.status(200).send('Usuário adicionado ao projeto com sucesso');
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    // Endpoint para remover usuário do projeto
    async removeUserFromProject(req: Request, res: Response): Promise<void> {
        const { userId, projectId } = req.body;
        try {
            await this.projectService.removeUserFromProject(userId, projectId);
            res.status(200).send('Usuário removido do projeto com sucesso');
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    // Endpoint para listar usuários de um projeto
    async listUsersInProject(req: Request, res: Response): Promise<void> {
        const { projectId } = req.params;
        try {
            const users = await this.projectService.listUsersInProject(parseInt(projectId));
            res.status(200).json(users);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}