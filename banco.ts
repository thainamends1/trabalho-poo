import { DataSource } from "typeorm";
import { Project } from "./src/entity/Project";
import { User } from "./src/entity/User";
import { Task } from "./src/entity/Task";

export const banco = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "manager",
    synchronize: true,
    logging: true,
    entities: [Project, User, Task],
    subscribers: [],
    migrations: [],
});