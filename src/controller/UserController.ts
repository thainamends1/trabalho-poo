import { Request, Response } from 'express';
import { User } from '../entity/User';
import { UserService } from '../service/UserService';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const user: User = req.body;
            const newUser = await this.userService.create(user);
            return res.status(201).json(newUser);
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao criar usuario.', error: error.message });
        }
    }

    async list(req: Request, res: Response): Promise<Response> {
        try {
            const users = await this.userService.list();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao listar usuarios.', error: error.message });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            const user: Partial<User> = req.body;
            await this.userService.update(id, user);
            return res.status(200).json({ message: `Usuario com ID ${id} atualizado com sucesso.` });
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao atualizar usuario.', error: error.message });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id);
            const user = await this.userService.delete(id);
            return res.status(200).json({ message: `Usuario com ID ${id} removido com sucesso.`, user });
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao remover usuario.', error: error.message });
        }
    }

    async findById(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            const user = await this.userService.findById(id);

            if (!user) {
                return res.status(404).json({ message: `Usuario com ID ${id} não encontrado.` });
            }

            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao buscar usuario.', error: error.message });
        }
    }
}