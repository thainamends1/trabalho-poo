import { User } from "../entity/User";
import { UserRepository } from "../repository/UserRepository";

export class UserService {

    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(user: User): Promise<User> {
        return await this.userRepository.create(user);
    }
    
    async read(): Promise<User[]> {
        return await this.userRepository.read();
    }

    async update(id: number, user: Partial<User>): Promise<void>{
        await this.userRepository.update(id, user);
    }

    async delete(id: number): Promise<boolean> {
        const user = await this.userRepository.find({ id: id });

        if (!user) {
            return false;
        }

        await this.userRepository.delete(user);
        return true;
    }

    // -------------------- Relacionamento com o Projeto ---------------------------------

    // -------------------- Relacionamento com a Tarefa ---------------------------------

    // -------------------- Relacionamento com o Comentário ---------------------------------
}