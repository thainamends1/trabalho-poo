import { Request, Response } from 'express';
import { Comment } from '../entity/Comment';
import { CommentService } from '../service/CommentService';

export class CommentController {
    private commentService: CommentService;

    constructor() {
        this.commentService = new CommentService();
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const { comment, userId, taskId } = req.body;
            const newComment = await this.commentService.create(comment, userId, taskId);
            return res.status(201).json(newComment);
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao criar comentario.', error: error.message });
        }
    }

    // async create(req: Request, res: Response): Promise<Response> {
    //     try {
    //         const { text, userId, taskId } = req.body;  // Extrai text, userId e taskId do body
    //         const comment = new Comment();
    //         comment.text = text;

    //         const newComment = await this.commentService.create(comment, userId, taskId);
    //         if (!newComment) {
    //             return res.status(403).json({ message: 'Usuário não é responsável pela tarefa e não pode comentar.' });
    //         }
    //         return res.status(201).json(newComment);
    //     } catch (error) {
    //         return res.status(400).json({ message: 'Erro ao criar comentário.', error: error.message });
    //     }
    // }

    async read(req: Request, res: Response): Promise<Response> {
        try {
            const comments = await this.commentService.read();
            return res.status(200).json(comments);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao listar comentarios.', error: error.message });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            const comment: Partial<Comment> = req.body;
            await this.commentService.update(id, comment);
            return res.status(200).json({ message: `Comentario com ID ${id} atualizado com sucesso.` });
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao atualizar comentario.', error: error.message });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id);
            const comment = await this.commentService.delete(id);
            return res.status(200).json({ message: `Comentario com ID ${id} removido com sucesso.`, comment });
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao remover comentario.', error: error.message });
        }
    }

    async findById(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            const comment = await this.commentService.findById(id);

            if (!comment) {
                return res.status(404).json({ message: `Comentário com ID ${id} não encontrado.` });
            }

            return res.status(200).json(comment);
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao buscar comentário.', error: error.message });
        }
    }
}