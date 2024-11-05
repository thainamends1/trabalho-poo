import { Repository } from 'typeorm';
import { banco } from '../../banco';
import { Comment } from '../entity/Comment';

export class CommentRepository {
    private repositorio: Repository<Comment>;

    constructor() {
        this.repositorio = banco.getRepository(Comment);
    }

    // Criar um comentario
    async create(comment: Comment): Promise<Comment> {
        return await this.repositorio.save(comment);
    }

    // Listar comentarios
    async read(): Promise<Comment[]> {
        return await this.repositorio.find();
    }

    // Para listar o relacionamento MANY TO ONE com Usuario
    async readCommentUser(): Promise<Comment[]> {
        return await this.repositorio.find({
            relations: ["user"],
        });
    }

    // Para listar o relacionamento MANY TO ONE com Tarefa
    async readCommentTask(): Promise<Comment[]> {
        return await this.repositorio.find({
            relations: ["task"],
        });
    }

    // Atualiza os dados do comentario
    async update(id: number, comment: Partial<Comment>): Promise<void> {
        await this.repositorio.update(id, comment);
    }

    // Deleta um comentario do repositório
    async delete(comment: Comment): Promise<Comment> {
        return await this.repositorio.remove(comment);
    }

    // Busca um comentario no repositório ao ser passado algum atributo
    async find(comment: Partial<Comment>): Promise<Comment | null> {
        return await this.repositorio.findOne({where : comment});
    }
    
    // Busca um comentario no repositório através da PK dele
    async findById(id: number): Promise<Comment> {
        return await this.repositorio.findOneBy({id: id});
    }
}