import { Router } from "express";
import tarefaRouter from "./tarefa.js"

const router = Router();

router.use("/tarefa", tarefaRouter)

export default router;