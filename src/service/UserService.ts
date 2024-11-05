import { User } from "../entity/User";
import { CommentRepository } from "../repository/CommentRepository";
import { ProjectRepository } from "../repository/ProjectRepository";
import { TaskRepository } from "../repository/TaskRepository";
import { UserRepository } from "../repository/UserRepository";

export class UserService {

    private userRepository: UserRepository;
    private projectRepository: ProjectRepository;
    // private taskRepository: TaskRepository;
    // private commentRepository: CommentRepository;

    constructor() {
        this.userRepository = new UserRepository();
        this.projectRepository = new ProjectRepository();
        // this.taskRepository = new TaskRepository();
        // this.commentRepository = new CommentRepository();
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

    // ---------------------------------------------------------------------------------------
}