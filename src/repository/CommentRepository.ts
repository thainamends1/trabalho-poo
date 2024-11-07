import { Repository } from 'typeorm';
import { banco } from '../../banco';
import { Comment } from '../entity/Comment';
import { User } from '../entity/User';
import { Task } from '../entity/Task';

export class CommentRepository {
    private repository: Repository<Comment>;

    constructor() {
        this.repository = banco.getRepository(Comment);
    }

    async save(comment: Comment): Promise<Comment> {
        return await this.repository.save(comment);
    }

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

    // Vincula um comentário ao usuário e à tarefa se o usuário for associado à tarefa
    async saveWithUserAndTask(userId: number, taskId: number, text: string): Promise<Comment> {
        // Obtém o usuário e a tarefa com as relações necessárias
        const userRepository = banco.getRepository(User);
        const taskRepository = banco.getRepository(Task);

        const user = await userRepository.findOne({
            where: { id: userId },
            relations: ['tasks']
        });

        const task = await taskRepository.findOne({
            where: { id: taskId },
            relations: ['users']
        });

        if (!user) {
            throw new Error('Usuário não encontrado.');
        }

        if (!task) {
            throw new Error('Tarefa não encontrada.');
        }

        // Verifica se o usuário está associado à tarefa
        const userIsAssignedToTask = task.users.some(taskUser => taskUser.id === userId);
        
        if (!userIsAssignedToTask) {
            throw new Error('Usuário não está associado a esta tarefa e não pode comentar.');
        }

        // Cria o comentário vinculado ao usuário e à tarefa
        const comment = new Comment();
        comment.text = text;
        comment.user = user;
        comment.task = task;

        return await this.repository.save(comment);
    }
}