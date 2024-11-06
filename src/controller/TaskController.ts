import { Request, Response } from 'express';
import { Task } from '../entity/Task';
import { TaskService } from '../service/TaskService';

export class TaskController {
    private taskService: TaskService;

    constructor() {
        this.taskService = new TaskService();
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const task: Task = req.body;
            const newTask = await this.taskService.create(task);
            return res.status(201).json(newTask);
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao criar tarefa.', error: error.message });
        }
    }

    async read(req: Request, res: Response): Promise<Response> {
        try {
            const tasks = await this.taskService.read();
            return res.status(200).json(tasks);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao listar tarefas.', error: error.message });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            const task: Partial<Task> = req.body;
            await this.taskService.update(id, task);
            return res.status(200).json({ message: `Tarefa com ID ${id} atualizada com sucesso.` });
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao atualizar tarefa.', error: error.message });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id);
            const task = await this.taskService.delete(id);
            return res.status(200).json({ message: `Tarefa com ID ${id} removida com sucesso.`, task });
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao remover tarefa.', error: error.message });
        }
    }

    async findById(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            const task = await this.taskService.findById(id);

            if (!task) {
                return res.status(404).json({ message: `Tarefa com ID ${id} não encontrada.` });
            }

            return res.status(200).json(task);
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao buscar tarefa.', error: error.message });
        }
    }
}