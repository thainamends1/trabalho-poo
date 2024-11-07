import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";
import { Project } from "./Project";
import { ITimestamp } from "../interfaces/ITimestamp";
import { IBase } from "../interfaces/IBase";

@Entity()
export class Task implements ITimestamp, IBase {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column()
    public description: string;

    @CreateDateColumn({ name: 'created_at'})
    public createdAt: Date;
    
    @UpdateDateColumn({ name: 'updated_at' })
    public updatedAt: Date;
    
    @DeleteDateColumn({ name: 'deleted_at' })
    public deletedAt: Date;
    
    @Column({ type: 'boolean', default: false, name: 'is_completed' })
    public isCompleted: boolean;

    @ManyToOne(() => Project, (project) => project.tasks, { onDelete: 'CASCADE' })
    public project: Project;

    @ManyToMany(() => User, (user) => user.tasks)
    public users: User[];

    @OneToMany(() => Comment, (comment) => comment.task)
    public comments: Comment[];
}