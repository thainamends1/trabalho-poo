import { Repository } from 'typeorm';
import { banco } from '../../banco';
import { Comment } from '../entity/Comment';

export class CommentRepository {
    private repository: Repository<Comment>;

    constructor() {
        this.repository = banco.getRepository(Comment);
    }

    // Criar um comentario
    async create(comment: Comment): Promise<Comment> {
        return await this.repository.save(comment);
    }

    // Salvar um comentario
    async save(comment: Comment): Promise<Comment> {
        return await this.repository.save(comment);
    }

    // Listar comentarios
    async read(): Promise<Comment[]> {
        return await this.repository.find();
    }

    // Atualiza os dados do comentario
    async update(id: number, comment: Partial<Comment>): Promise<void> {
        await this.repository.update(id, comment);
    }

    // Deleta um comentario do repositório
    async delete(comment: Comment): Promise<Comment> {
        return await this.repository.remove(comment);
    }

    // Busca um comentario no repositório ao ser passado algum atributo
    async find(comment: Partial<Comment>): Promise<Comment | null> {
        return await this.repository.findOne({where : comment});
    }
    
    // Busca um comentario no repositório através da PK dele
    async findById(id: number): Promise<Comment> {
        return await this.repository.findOneBy({id: id});
    }

    // Para listar o relacionamento MANY TO ONE com Usuario
    async listCommentUser(): Promise<Comment[]> {
        return await this.repository.find({
            relations: ["user"],
        });
    }

    // Para listar o relacionamento MANY TO ONE com Tarefa
    async listCommentTask(): Promise<Comment[]> {
        return await this.repository.find({
            relations: ["task"],
        });
    }

    // -------------------- Relacionamento com o Usuário ---------------------------------


    // -------------------- Relacionamento com a Tarefa ---------------------------------
    
}