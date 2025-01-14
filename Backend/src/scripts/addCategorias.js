const mongoose = require("mongoose");
const Categoria = require("../models/categorias");

// Define um array de categorias com os nomes das categorias a serem adicionadas
const categorias = [
  { nome: "Estudo" },
  { nome: "Trabalho" },
  { nome: "Lazer" },
  { nome: "Pessoal" },
  { nome: "Saúde" },
  { nome: "Financeiro" },
  { nome: "Família" },
  { nome: "Casa" },
  { nome: "Viagem" },
  { nome: "Eventos" },
  { nome: "Projetos" },
  { nome: "Compras" },
];

// Conecta ao banco de dados MongoDB chamado "TaskMaster"
mongoose.connect("mongodb://localhost:27017/TaskMaster", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Função para adicionar as categorias ao banco de dados
const AdicionarCategorias = function () {
  // Usa o método insertMany para adicionar várias categorias ao mesmo tempo
  Categoria.insertMany(categorias)
    .then(function (categorias) {
      console.log("Categorias adicionadas com sucesso!", categorias);
    })
    .catch(function (err) {
      console.log("Erro ao adicionar categorias!", err);
    });
};
// Chama a função para adicionar as categorias
AdicionarCategorias();