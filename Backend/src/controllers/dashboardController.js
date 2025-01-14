const Tarefa = require("../models/tarefas");

// Obter dados do Dashboard
exports.obterDashboardData = function (req, res) {
   // Conta o total de documentos na coleção de tarefas
  const totalTarefas = Tarefa.countDocuments();
   // Busca todas as tarefas com status "Concluída"
  const tarefasConcluidas = Tarefa.find({ status: "Concluída" });
   // Busca todas as tarefas com status "Em progresso"
  const tarefasEmProgresso = Tarefa.find({ status: "Em progresso" });
   // Busca todas as tarefas com status "Pendente"
  const tarefasPendentes = Tarefa.find({ status: "Pendente" });
   // Executa todas as promessas simultaneamente e aguarda os resultados
  Promise.all([
    totalTarefas,
    tarefasConcluidas,
    tarefasEmProgresso,
    tarefasPendentes,
  ])
    // Desestrutura os resultados das promessas
    .then((results) => {
      const [
        totalTarefasResult,
        tarefasConcluidasResult,
        tarefasEmProgressoResult,
        tarefasPendentesResult,
      ] = results;
       // Envia os dados do dashboard como resposta em formato JSON
      res.json({
        totalTarefas: totalTarefasResult,
        tarefasConcluidas: tarefasConcluidasResult,
        tarefasEmProgresso: tarefasEmProgressoResult,
        tarefasPendentes: tarefasPendentesResult,
      });
    })
     // Envia uma resposta de erro caso alguma promessa falhe
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};
