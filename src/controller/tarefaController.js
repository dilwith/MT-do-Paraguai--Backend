import atividadeService from "../services/atividadesService.js"

const postTarefaController = async (req,res) => {
    console.log( req.body )
    const { title, description, status } = req.body;
    try {
        const tarefa = await atividadeService.createTarefaService(
            { title, description, status }
        )

        return res.status(201).send(tarefa)
    }catch (e) {
        res.status(500).send(e.message)
        console.log ("DEU ERRO MERMAO -> Controller tarefaController.js")
    }
}

const deleteTarefaController = async (req,res) =>{
    const { id } = req.params

    try {
        const resultado = await atividadeService.deleteTarefaService(id);
        
        if (resultado.rowCount === 0) {
            return res.status(404).send({ message: "Tarefa não encontrada!" });
        }

        return res.status(200).send({ message: "Tarefa deletada com sucesso!" });
    } catch (e) {
        return res.status(500).send({ message: "Erro ao deletar tarefa", error: e.message });
    }
};

const updateTarefaController = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        if (!title && !description) {
            return res.status(400).send({ message: "Informe pelo menos o título ou a descrição para atualizar." });
        }

        const resultado = await atividadeService.updateTarefaService(id, title, description);

        if (resultado.rowCount === 0) {
            return res.status(404).send({ message: "Tarefa não encontrada!" });
        }

        return res.status(200).send({ message: "Tarefa atualizada com sucesso!" });
    } catch (e) {
        return res.status(500).send({ message: "Erro ao atualizar tarefa", error: e.message });
    }
};

const getTarefasController = async (req, res) => {
    try {
        const tarefas = await atividadeService.getTarefasService();

        if (tarefas.length === 0) {
            return res.status(404).send({ message: "Nenhuma tarefa encontrada!" });
        }

        return res.status(200).send(tarefas);
    } catch (e) {
        return res.status(500).send({ message: "Erro ao buscar tarefas", error: e.message });
    }
};


export default { postTarefaController , deleteTarefaController , updateTarefaController , getTarefasController};