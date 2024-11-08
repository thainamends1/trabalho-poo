import { Request, Response } from 'express';
import { Project } from '../entity/Project';
import { ProjectService } from '../service/ProjectService';

export class ProjectController {
    private projectService: ProjectService;

    constructor() {
        this.projectService = new ProjectService();
    }

    //  Lista todos os projetos
    async list(req: Request, res: Response): Promise<Response> {
        try {
            const projects = await this.projectService.list();
            return res.status(200).json(projects);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao listar projetos.', error: error.message });
        }
    }

    //  Cria novo projeto
    async create(req: Request, res: Response): Promise<Response> {
        try {
            const project: Project = req.body;
            const newProject = await this.projectService.create(project);
            return res.status(201).json(newProject);
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao criar projeto.', error: error.message });
        }
    }

    // Atualiza um projeto existente
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

    // Deleta um projeto
    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id);
            const project = await this.projectService.delete(id);
            return res.status(200).json({ message: `Projeto com ID ${id} removido com sucesso.`, project });
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao remover projeto.', error: error.message });
        }
    }

    // Pesquisa por um projeto através da sua PK
    async findById(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            const project = await this.projectService.findById(id);

            if (!project) {
                return res.status(404).json({ message: `Projeto com ID ${id} não encontrado.` });
            }

            return res.status(200).json(project);
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao buscar projeto.', error: error.message });
        }
    }

    // Método para verificar a regra de negócio:
    // -> um projeto só pode ser finalizado se todos os usuários que estiverem nele
    // possuir TODAS as suas tarefas vinculadas concluídas.
    async finalizeProject(req: Request, res: Response): Promise<Response> {
        try {
            const projectId = parseInt(req.params.id);
            
            const success = await this.projectService.finalizeProject(projectId);
            
            if (success) {
                return res.status(200).json({ message: `Projeto com ID ${projectId} finalizado com sucesso.` });
            }
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}