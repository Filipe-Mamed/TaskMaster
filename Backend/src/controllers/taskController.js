const { el } = require("date-fns/locale");
const Tarefa = require("../models/tarefas");
const moment = require("moment-timezone");

// Obter todas as tarefas
exports.obterTarefas = function (req, res) {
  Tarefa.find()
    .populate("categoria", "nome")
    .then(function (tarefas) {
      res.status(200).json(tarefas);
    })
    .catch(function (erro) {
      res.status(500).json({ erro: erro.message });
    });
};

// Obter tarefa por ID
exports.obterTarefaPorId = function (req, res) {
  const { id } = req.params;
  Tarefa.findById(id)
    .populate("categoria", "nome")
    .then(function (tarefa) {
      if (tarefa) {
        res.status(200).json(tarefa);
      } else {
        res.status(404).json({ erro: "Tarefa não encontrada" });
      }
    })
    .catch(function (erro) {
      res.status(500).json({ erro: erro.message });
    });
};

// Criar nova tarefa

exports.criarTarefa = function (req, res) {
  const { titulo, descricao, categoria, status, dataConclusao } = req.body;
  let erros = [];
  if (!titulo || typeof titulo == undefined || titulo == null) {
    erros.push({ message: "Título obrigatório!" });
  }
  if (!descricao || typeof descricao == undefined || descricao == null) {
    erros.push({ message: "Descrição obrigatório!" });
  }
  if (!categoria || typeof categoria == undefined || categoria == null) {
    erros.push({ message: "Categoria obrigatório!" });
  }
  if (erros.length > 0) {
    return res.status(400).json({ erros });
  } else {
    let dataConclusaoUtc = dataConclusao
      ? moment.tz(dataConclusao, "America/Sao_Paulo").utc().format()
      : null;

    const newTask = new Tarefa({
      titulo,
      descricao,
      categoria,
      status: status || "Pendente",
      dataConclusao: dataConclusaoUtc,
    });

    newTask
      .save()
      .then(function (salvaTask) {
        return res
          .status(201)
          .json({ salvaTask, redirectTo: "/minhastarefas" });
      })
      .catch(function (erro) {
        return res.status(400).json({ erro: erro.message });
      });
  }
};

// Atualizar tarefa por ID

exports.atualizarTarefa = function (req, res) {
  const { id } = req.params;
  const { titulo, descricao, categoria, status, dataConclusao } = req.body;

  Tarefa.findById(id)
    .then(function (tarefa) {
      if (!tarefa) {
        return res.status(404).json({ erro: "Tarefa não encontrada" });
      }

      tarefa.titulo = titulo || tarefa.titulo;
      tarefa.descricao = descricao || tarefa.descricao;
      tarefa.categoria = categoria || tarefa.categoria;
      tarefa.status = status || tarefa.status;
      tarefa.dataConclusao = dataConclusao
        ? moment(dataConclusao).tz("America/Sao_Paulo", true).toDate()
        : tarefa.dataConclusao;

      return tarefa.save();
    })
    .then(function (tarefaAtualizada) {
      return res.status(200).json({ tarefaAtualizada });
    })
    .catch(function (err) {
      console.error("Erro ao atualizar tarefa:", err);
      return res.status(500).json({ erro: err.message });
    });
};

// Deletar tarefa por ID

exports.excluirTarefa = function (req, res) {
  const { id } = req.params;
  Tarefa.findByIdAndDelete(id)
    .then(function (tarefa) {
      if (tarefa) {
        return res.status(200).json(tarefa);
      } else {
        return res.status(404).json({ erro: "Tarefa não encontrada" });
      }
    })
    .catch(function (erro) {
      return res.status(500).json({ erro: erro.message });
    });
};