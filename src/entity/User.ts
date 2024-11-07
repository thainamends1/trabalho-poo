import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Project } from "./Project";
import { Task } from "./Task";
import { ITimestamp } from "../interfaces/ITimestamp";

@Entity()
export class User implements ITimestamp {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column({ type: 'varchar', length: 100 })
    public name: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    public email: string;

    @CreateDateColumn({ name: 'created_at'})
    createdAt: Date;
    
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToMany(() => Project, (project) => project.users)
    @JoinTable({ name: 'user_project' })
    public projects: Project[];

    @ManyToMany(() => Task, (task) => task.users, { eager: true })
    @JoinTable({ name: 'user_task' })
    public tasks: Task[];
}