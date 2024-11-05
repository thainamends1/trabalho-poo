import express from 'express';
import { TaskController } from '../controller/TaskController';

const taskRouter = express.Router();
const taskController = new TaskController();

taskRouter.get('/', (req, res) => { taskController.read(req,res) });
taskRouter.post('/', (req, res) => { taskController.create(req,res) });
taskRouter.put('/:id', (req, res) => { taskController.update(req,res) });
taskRouter.delete('/:id', (req, res) => { taskController.delete(req,res) });
taskRouter.post('/:taskId/comments', (req, res) => taskController.addCommentToTask(req, res));

export default taskRouter;