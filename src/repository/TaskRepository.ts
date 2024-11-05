import { Repository } from 'typeorm';
import { banco } from '../../banco';
import { Task } from '../entity/Task';

export class TaskRepository {
    private repositorio: Repository<Task>;

    constructor() {
        this.repositorio = banco.getRepository(Task);
    }

    // Criar uma tarefa
    async create(task: Task): Promise<Task> {
        return await this.repositorio.save(task);
    }

    // Listar tarefas
    async read(): Promise<Task[]> {
        return await this.repositorio.find();
    }

    // Para listar o relacionamento ONE TO MANY com Comentario
    public async listTaskComment(): Promise<Task[]> {
        return await this.repositorio.find({
            relations: ["comments"],
        });
    }

    // Para listar o relacionamento MANY TO ONE com Projeto
    async listTaskProject(): Promise<Task[]> {
        return await this.repositorio.find({
            relations: ["project"],
        });
    }
    
    // Para listar o relacionamento MANY TO MANY com Tarefa
    async listTaskUser(): Promise<Task[]> {
        return await this.repositorio.find({
            relations: ["users"],
        });
    }

    // Atualiza os dados de tarefa
    async update(id: number, task: Partial<Task>): Promise<void> {
        await this.repositorio.update(id, task);
    }

    // Deleta uma tarefa do repositório
    async delete(task: Task): Promise<Task> {
        return await this.repositorio.remove(task);
    }

    // Busca tarefa no repositório ao ser passado algum atributo
    async find(task: Partial<Task>): Promise<Task | null> {
        return await this.repositorio.findOne({where : task});
    }
    
    // Busca tarefa no repositório através da PK dele
    async findById(id: number): Promise<Task> {
        return await this.repositorio.findOneBy({id: id});
    }

    // -------------------- Relacionamento com o Projeto ---------------------------------

    // -------------------- Relacionamento com o Usuários ---------------------------------

    // -------------------- Relacionamento com o Comentários ---------------------------------
}