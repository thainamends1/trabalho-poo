import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm"
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

    @Column({ type: 'boolean', default: false, name: 'is_completed' })
    public isCompleted: boolean;

    @ManyToMany(() => User, (user) => user.projects, { eager: true })
    public users: User[];

    @OneToMany(() => Task, (task) => task.project, { eager: true })
    public tasks: Task[];
}