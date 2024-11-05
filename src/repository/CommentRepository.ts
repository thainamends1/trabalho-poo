import { Repository } from 'typeorm';
import { banco } from '../../banco';
import { Comment } from '../entity/Comment';

export class CommentRepository {
    private repository: Repository<Comment>;

    constructor() {
        this.repository = banco.getRepository(Comment);
    }

    async save(comment: Comment): Promise<Comment> {
        return await this.repository.save(comment);
    }

    // Read
    async findAll(): Promise<Comment[]> {
        return await this.repository.find();
    }

    async findById(id: number): Promise<Comment> {
        return await this.repository.findOneBy({id: id});
    }

    async find(comment: Partial<Comment>): Promise<Comment | null> {
        return await this.repository.findOne({where : comment});
    }

    async update(id: number, comment: Partial<Comment>): Promise<void> {
        await this.repository.update(id, comment);
    }

    async delete(comment: Comment): Promise<Comment> {
        return await this.repository.remove(comment);
    }

    // -------------------- Relacionamento com o Usuário ---------------------------------
    // Para listar o relacionamento MANY TO ONE com Usuario
    async listCommentsWithUsers(): Promise<Comment[]> {
        return await this.repository.find({
            relations: ["user"],
        });
    }

    async findByIdWithUser(id: number): Promise<Comment | null> {
        return await this.repository.findOne({
            where: { id: id },
            relations: ['user']
        });
    }

    // -------------------- Relacionamento com a Tarefa ---------------------------------
    // Para listar o relacionamento MANY TO ONE com Tarefa
    async listCommentsWithTasks(): Promise<Comment[]> {
        return await this.repository.find({
            relations: ["task"],
        });
    }

    async findByIdWithTask(id: number): Promise<Comment | null> {
        return await this.repository.findOne({
            where: { id: id },
            relations: ['task']
        });
    }
}