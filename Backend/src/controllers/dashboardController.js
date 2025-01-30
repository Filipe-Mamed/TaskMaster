const Tarefa = require("../models/tarefas");

// Obter dados do Dashboard
exports.obterDashboardData = function (req, res) {
  if (!req.user) {
    return res.status(401).json({ message: "Precisa estar logado para ver seus dados no Dashboard!" });
  }
  const usuarioId = req.user._id; // ID do usuário logado
   // Conta o total de documentos na coleção de tarefas
  const totalTarefas = Tarefa.countDocuments({ usuario: usuarioId });
   // Busca todas as tarefas com status "Concluída"
  const tarefasConcluidas = Tarefa.find({ status: "Concluída", usuario: usuarioId });
   // Busca todas as tarefas com status "Em progresso"
  const tarefasEmProgresso = Tarefa.find({ status: "Em progresso", usuario: usuarioId });
   // Busca todas as tarefas com status "Pendente"
  const tarefasPendentes = Tarefa.find({ status: "Pendente", usuario: usuarioId });
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
     .catch((err) => {
      res.status(500).json({ error: "Erro no servidor ao carregar os dados no Dashboard!", err });
    });
};
