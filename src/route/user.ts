import express from 'express';
import { UserController } from '../controller/UserController';

const userRouter = express.Router();
const userController = new UserController();

userRouter.get('/', (req, res) => { userController.read(req,res) });
userRouter.post('/', (req, res) => { userController.create(req,res) });
userRouter.put('/:id', (req, res) => { userController.update(req,res) });
userRouter.delete('/:id', (req, res) => { userController.delete(req,res) });

// userRouter.post('/:userId/projects/:projectId', (req, res) => userController.addUserToProject(req, res));
// userRouter.delete('/:userId/projects/:projectId', (req, res) => userController.removeUserFromProject(req, res));
// userRouter.get('/:projectId/users', (req, res) => userController.listUsersInProject(req, res));

export default userRouter;