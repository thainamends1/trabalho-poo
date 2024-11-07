import express from 'express';
import { TaskController } from '../controller/TaskController';

const taskRouter = express.Router();
const taskController = new TaskController();

// Rotas para Tarefa
taskRouter.get('/', (req, res) => { taskController.list(req,res) });
taskRouter.get('/:id', (req, res) => { taskController.findById(req, res) });
taskRouter.post('/', (req, res) => { taskController.create(req,res) });
taskRouter.put('/:id', (req, res) => { taskController.update(req,res) });
taskRouter.delete('/:id', (req, res) => { taskController.delete(req,res) });

export default taskRouter;