import express from 'express';
import { ProjectController } from '../controller/ProjectController';

const projectRouter = express.Router();
const projectController = new ProjectController();

// Rotas para Projeto
projectRouter.get('/', (req, res) => { projectController.read(req,res) });
projectRouter.post('/', (req, res) => { projectController.create(req,res) });
projectRouter.put('/:id', (req, res) => { projectController.update(req,res) });
projectRouter.delete('/:id', (req, res) => { projectController.delete(req,res) });
projectRouter.put('/:id/finalize', (req, res) => projectController.finalizeProject(req, res));

// projectRouter.post('/:id/user/:userId', (req, res) => projectController.addUserToProject(req, res));
// projectRouter.delete('/:id/user/:userId', (req, res) => projectController.removeUserFromProject(req, res));
// projectRouter.get('/:id/users', (req, res) => projectController.listUsersInProject(req, res));

// projectRouter.post('/:projectId/finish', (req, res) => projectController.finishProject(req, res));

export default projectRouter;