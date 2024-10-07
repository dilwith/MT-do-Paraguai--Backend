import atividadesController from "../controller/tarefaController.js"
import { Router } from "express";

const tarefaRouter = Router()

tarefaRouter.post("/post", atividadesController.postTarefaController)
tarefaRouter.get("/get", atividadesController.getTarefasController)
tarefaRouter.put("/put/:id", atividadesController.updateTarefaController) //tem ID
tarefaRouter.delete("/delete/:id", atividadesController.deleteTarefaController) //tem ID

export default tarefaRouter
