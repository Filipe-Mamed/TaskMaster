const express = require("express");
const router = express.Router();
const {auth} = require("../helpers/authMiddleware")

const {
  obterTarefas,
  obterTarefaPorId,
  criarTarefa,
  atualizarTarefa,
  excluirTarefa,
} = require("../controllers/taskController");

router.get("/", obterTarefas); // Obter todas as tarefas
router.post("/", auth, criarTarefa); // Criar nova tarefa
router.get("/:id", auth, obterTarefaPorId); // Obter tarefa por ID
router.put("/:id", auth, atualizarTarefa); // Atualizar tarefa por ID
router.delete("/:id", auth, excluirTarefa); // Deletar tarefa por ID

module.exports = router;