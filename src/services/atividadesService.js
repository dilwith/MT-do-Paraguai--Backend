import { cliente } from "../database/connect.mjs";

async function createTarefaService({title , description , status}) {
    if (!title || !description) {
        throw new Error("Coloca tudo direito nessa mierda meu irmão, faltou título ou descrição");
    }

    try {
        // Query para inserir a nova tarefa no banco de dados
        const query = `INSERT INTO atividade (title, description, status) VALUES ($1, $2, $3) RETURNING *`;
        const values = [title, description, status];

        // Executar a query
        const result = await cliente.query(query, values);

        // Retorna o resultado da inserção
        return {
            message: "Tarefa criada com sucesso!",
            post: result.rows[0]  // Retorna a linha inserida
        };
    } catch (error) {
        console.error('Erro ao criar tarefa', error);
        throw new Error("Erro ao criar tarefa");
    }

}

async function deleteTarefaService(id) {
    if (!id) {
        throw new Error("ID é obrigatório para deletar uma tarefa");
    }

    try {
        // Query para deletar a tarefa com base no ID
        const query = `DELETE FROM atividade WHERE id = $1`; //EVITA SQL injection
        const result = await cliente.query(query, [id]);  // Executa a query com o ID como parâmetro
        
        return result;
    } catch (error) {
        console.error("Erro ao deletar tarefa", error);
        throw new Error("Erro ao deletar tarefa");
    }
}

async function updateTarefaService(id, title, description) {
    if (!id) {
        throw new Error("ID é obrigatório para atualizar uma tarefa");
    }

    // Definir dinamicamente quais campos serão atualizados
    const fieldsToUpdate = [];
    const values = [];

    if (title) {
        fieldsToUpdate.push('title = $' + (fieldsToUpdate.length + 1));  // $1 para o title
        values.push(title);
    }

    if (description) {
        fieldsToUpdate.push('description = $' + (fieldsToUpdate.length + 1));  // $2 para a description
        values.push(description);
    }

    values.push(id); // Adiciona o ID como o último parâmetro da query

    const query = `UPDATE atividade SET ${fieldsToUpdate.join(', ')} WHERE id = $${values.length}`;

    try {
        const result = await cliente.query(query, values);
        return result;
    } catch (error) {
        console.error("Erro ao atualizar tarefa", error);
        throw new Error("Erro ao atualizar tarefa");
    }
}

async function getTarefasService() {
    const query = "SELECT * FROM atividade";  // Query para buscar todas as tarefas

    try {
        const result = await cliente.query(query);
        return result.rows;  // Retorna as tarefas
    } catch (error) {
        console.error("Erro ao buscar tarefas", error);
        throw new Error("Erro ao buscar tarefas");
    }
}

export default {createTarefaService , deleteTarefaService , updateTarefaService , getTarefasService }

