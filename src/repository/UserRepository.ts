import { Repository } from 'typeorm';
import { User } from '../entity/User';
import { banco } from '../../banco';

export class UserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = banco.getRepository(User);
    }

    async save(user: User): Promise<User> {
        return await this.repository.save(user);
    }

    async findAll(): Promise<User[]> {
        return await this.repository.find();
    }

    async findById(id: number): Promise<User> {
        return await this.repository.findOneBy({id: id});
    }

    async find(user: Partial<User>): Promise<User | null> {
        return await this.repository.findOne({where : user});
    }

    async update(id: number, user: Partial<User>): Promise<void> {
        await this.repository.update(id, user);
    }

    async delete(user: User): Promise<User> {
        return await this.repository.remove(user);
    }
}