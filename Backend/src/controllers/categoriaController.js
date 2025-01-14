const Categoria = require("../models/categorias");

// Obter todas as categorias
exports.obterCategorias = function (req, res) {
  Categoria.find()
    .then(function (categorias) {
      res.status(200).json(categorias);
    })
    .catch(function (erro) {
      res.status(500).json({ erro: erro.message });
    });
};
