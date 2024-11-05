import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Project } from "./Project";
import { Task } from "./Task";
import { Comment } from "./Comment";
import { ITimestamp } from "../interfaces/ITimestamp";

@Entity()
export class User implements ITimestamp {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column({ type: 'varchar', length: 100 })
    public nome: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    public email: string;

    @CreateDateColumn({ name: 'created_at'})
    createdAt: Date;
    
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
    
    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;

    @ManyToMany(() => Project, (project) => project.users)
    public projects: Project[];

    @ManyToMany(() => Task, (task) => task.users)
    @JoinTable({ name: 'user_task' })
    public tasks: Task[];

    @OneToMany(() => Comment, (comment) => comment.user)
    public comments: Comment[];
}