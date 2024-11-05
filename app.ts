import "reflect-metadata";
import express from 'express';
import { banco } from "./banco"
import projectRouter from "./src/route/project";
import taskRouter from "./src/route/task";
import userRouter from "./src/route/user";
import commentRouter from "./src/route/comment";

const minhaAPI = express();
const port = 3000;

minhaAPI.use(express.json());

minhaAPI.use('/project', projectRouter);
minhaAPI.use('/task', taskRouter);
minhaAPI.use('/user', userRouter);
minhaAPI.use('/comment', commentRouter);


minhaAPI.listen(port, async () => {
  try {
    await banco.initialize();
    console.log("Conexão com o banco de dados efetuada com sucesso.");
    
    console.log(`Servidor web rodando na porta ${port}`)
      
  } catch (erro) {
    console.error("Erro durante a inicialização do banco de dados:", erro);
  }
});