const mongoose = require("mongoose");
const moment = require("moment-timezone");
const Schema = mongoose.Schema;

const getHorarioBrasileiro = () => moment().tz("America/Sao_Paulo").toDate();

const tarefasSchema = new Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    descricao: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pendente", "Em progresso", "Concluída"],
      default: "Pendente",
    },
    categoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categoria",
      required: true,
    },
    dataCriacao: {
      type: Date,
      default: getHorarioBrasileiro,
    },
    dataConclusao: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Tarefa = mongoose.model("Tarefa", tarefasSchema);

module.exports = Tarefa;
