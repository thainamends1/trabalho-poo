/*-------------------------------------------------------------------------------

    Universidade Federal de Mato Grosso.
    Trabalho: Trabalho Final - API.
    Disciplina: Programação Orientada a Objetos.
    
---------------------------------------------------------------------------------*/

import "reflect-metadata";
import express from 'express';
import { banco } from "./banco"
import projectRouter from "./src/route/project";
import taskRouter from "./src/route/task";
import userRouter from "./src/route/user";

const minhaAPI = express();
const port = 3000;

minhaAPI.use(express.json());

minhaAPI.use('/projects', projectRouter);
minhaAPI.use('/tasks', taskRouter);
minhaAPI.use('/users', userRouter);


minhaAPI.listen(port, async () => {
  try {
    await banco.initialize();
    console.log("Conexão com o banco de dados efetuada com sucesso.");
    
    console.log(`Servidor web rodando na porta ${port}`)
      
  } catch (erro) {
    console.error("Erro durante a inicialização do banco de dados:", erro);
  }
});
