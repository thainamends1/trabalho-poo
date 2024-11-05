import express from 'express';
import { CommentController } from '../controller/CommentController';

const commentRouter = express.Router();
const commentController = new CommentController();

commentRouter.get('/', (req, res) => { commentController.read(req,res) });
commentRouter.post('/', (req, res) => { commentController.create(req,res) });
commentRouter.put('/:id', (req, res) => { commentController.update(req,res) });
commentRouter.delete('/:id', (req, res) => { commentController.delete(req,res) });

export default commentRouter;