import express from 'express';
import { UserController } from '../controller/UserController';

const userRouter = express.Router();
const userController = new UserController();

// Rotas para Usuário
userRouter.get('/', (req, res) => { userController.list(req,res) });
userRouter.get('/:id', (req, res) => { userController.findById(req, res) });
userRouter.post('/', (req, res) => { userController.create(req,res) });
userRouter.put('/:id', (req, res) => { userController.update(req,res) });
userRouter.delete('/:id', (req, res) => { userController.delete(req,res) });

export default userRouter;