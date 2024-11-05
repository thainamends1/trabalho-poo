import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Task } from "./Task";
import { ITimestamp } from "../interfaces/ITimestamp";

@Entity()
export class Comment implements ITimestamp {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column()
    public text: string;

    @CreateDateColumn({ name: 'created_at'})
    public createdAt: Date;
    
    @UpdateDateColumn({ name: 'updated_at' })
    public updatedAt: Date;
    
    @DeleteDateColumn({ name: 'deleted_at' })
    public deletedAt: Date;

    @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
    public user: User;

    @ManyToOne(() => Task, (task) => task.comments, { onDelete: 'CASCADE' })
    public task: Task;
}