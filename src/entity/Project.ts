import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinTable } from "typeorm"
import { User } from "./User";
import { Task } from "./Task";
import { ITimestamp } from "../interfaces/ITimestamp";
import { IBase } from "../interfaces/IBase";

@Entity()
export class Project implements ITimestamp, IBase {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column({ type: 'varchar', length: 100 })
    public title: string;

    @Column({ nullable: true })
    public description: string;

    @CreateDateColumn({ name: 'created_at'})
    public createdAt: Date;
    
    @UpdateDateColumn({ name: 'updated_at' })
    public updatedAt: Date;
    
    @DeleteDateColumn({ name: 'deleted_at' })
    public deletedAt: Date;

    @Column({ type: 'boolean', default: false, name: 'is_completed' })
    public isCompleted: boolean;

    @ManyToMany(() => User, (user) => user.projects)
    @JoinTable({ name: 'project_user' })
    public users: User[];

    @OneToMany(() => Task, (task) => task.project)
    public tasks: Task[];
}