import express from 'express';
import { ProjectController } from '../controller/ProjectController';

const projectRouter = express.Router();
const projectController = new ProjectController();

// Rotas para Projeto
projectRouter.get('/', (req, res) => { projectController.list(req,res) });
projectRouter.get('/:id', (req, res) => { projectController.findById(req, res) });
projectRouter.post('/', (req, res) => { projectController.create(req,res) });
projectRouter.put('/:id', (req, res) => { projectController.update(req,res) });
projectRouter.delete('/:id', (req, res) => { projectController.delete(req,res) });

projectRouter.put('/:id/finalize', (req, res) => { projectController.finalizeProject(req, res) });

export default projectRouter;