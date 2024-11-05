import { Repository } from 'typeorm';
import { User } from '../entity/User';
import { banco } from '../../banco';

export class UserRepository {
    private repositorio: Repository<User>;

    constructor() {
        this.repositorio = banco.getRepository(User);
    }

    // Criar um usuario
    async create(user: User): Promise<User> {
        return await this.repositorio.save(user);
    }

    // Listar usuarios
    async read(): Promise<User[]> {
        return await this.repositorio.find();
    }

    // Para listar o relacionamento ONE TO MANY com Comentario
    public async readUserComment(): Promise<User[]> {
        return await this.repositorio.find({
            relations: ["comments"],
        });
    }

    // Para listar o relacionamento MANY TO MANY com Projeto
    async readUserProject(): Promise<User[]> {
        return await this.repositorio.find({
            relations: ["projects"],
        });
    }

    // Para listar o relacionamento MANY TO MANY com Tarefa
    async readUserTask(): Promise<User[]> {
        return await this.repositorio.find({
            relations: ["tasks"],
        });
    }

    // Atualiza os dados do usuario
    async update(id: number, user: Partial<User>): Promise<void> {
        await this.repositorio.update(id, user);
    }

    // Deleta um usuario do repositório
    async delete(user: User): Promise<User> {
        return await this.repositorio.remove(user);
    }

    // Busca um usuario no repositório ao ser passado algum atributo
    async find(user: Partial<User>): Promise<User | null> {
        return await this.repositorio.findOne({where : user});
    }
    
    // Busca um usuario no repositório através da PK dele
    async findById(id: number): Promise<User> {
        return await this.repositorio.findOneBy({id: id});
    }
}