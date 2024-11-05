import { Comment } from "../entity/Comment";
import { CommentRepository } from "../repository/CommentRepository";

export class CommentService {

    private commentRepository: CommentRepository;

    constructor() {
        this.commentRepository = new CommentRepository();
    }

    async create(comment: Comment): Promise<Comment> {
        return await this.commentRepository.create(comment);
    }
    
    async read(): Promise<Comment[]> {
        return await this.commentRepository.read();
    }

    async update(id: number, comment: Partial<Comment>): Promise<void>{
        await this.commentRepository.update(id, comment);
    }

    async delete(id: number): Promise<boolean> {
        const comment = await this.commentRepository.find({ id: id });

        if (!comment) {
            return false;
        }

        await this.commentRepository.delete(comment);
        return true;
    }

    // -------------------- Relacionamento com o Usuário ---------------------------------

    // -------------------- Relacionamento com a Tarefa ---------------------------------

}