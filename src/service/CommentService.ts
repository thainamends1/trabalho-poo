import { Comment } from "../entity/Comment";
import { CommentRepository } from "../repository/CommentRepository";
import { TaskRepository } from "../repository/TaskRepository";
import { UserRepository } from "../repository/UserRepository";

export class CommentService {

    private commentRepository: CommentRepository;
    private taskRepository: TaskRepository;
    private userRepository: UserRepository;

    constructor() {
        this.commentRepository = new CommentRepository();
        this.taskRepository = new TaskRepository();
        this.userRepository = new UserRepository();
    }

    async create(comment: Comment, userId: number, taskId: number): Promise<Comment | null> {

        // Verificar se o usuário é o responsável pela tarefa
        const task = await this.taskRepository.findByIdWithUsers(taskId);
        
        if (!task) {
            throw new Error("Tarefa não encontrada.");
        }

        const isUserResponsible = task.users.some((user) => user.id === userId);

        if (!isUserResponsible) {
            throw new Error("Usuário não é responsável pela tarefa.");
        }

        // Se for o responsável, prossegue para salvar o comentário
        comment.user = await this.userRepository.findById(userId);
        comment.task = task;
        
        return await this.commentRepository.save(comment);
    }
    
    async read(): Promise<Comment[]> {
        return await this.commentRepository.findAll();
    }

    async update(id: number, comment: Partial<Comment>): Promise<void>{
        await this.commentRepository.update(id, comment);
    }

    async delete(id: number): Promise<boolean> {
        const comment = await this.commentRepository.findById(id);

        if (!comment) {
            return false;
        }

        await this.commentRepository.delete(comment);
        return true;
    }

    // -------------------- Relacionamento com Usuário --------------------------
    // Para listar o relacionamento MANY TO ONE com Usuario
    async listCommentsByUser(userId: number): Promise<Comment[]> {
        return await this.commentRepository.listCommentsWithUsers().then(comments => 
            comments.filter(comment => comment.user.id === userId)
        );
    }

    // -------------------- Relacionamento com Tarefa --------------------------
    // Para listar o relacionamento MANY TO ONE com Tarefa
    async listCommentsByTask(taskId: number): Promise<Comment[]> {
        return await this.commentRepository.listCommentsWithTasks().then(comments => 
            comments.filter(comment => comment.task.id === taskId)
        );
    }
}