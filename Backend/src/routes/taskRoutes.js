const express = require("express");
const router = express.Router();

const {
  obterTarefas,
  obterTarefaPorId,
  criarTarefa,
  atualizarTarefa,
  excluirTarefa,
} = require("../controllers/taskController");

router.get("/", obterTarefas); // Obter todas as tarefas
router.post("/", criarTarefa); // Criar nova tarefa
router.get("/:id", obterTarefaPorId); // Obter tarefa por ID
router.put("/:id", atualizarTarefa); // Atualizar tarefa por ID
router.delete("/:id", excluirTarefa); // Deletar tarefa por ID

module.exports = router;