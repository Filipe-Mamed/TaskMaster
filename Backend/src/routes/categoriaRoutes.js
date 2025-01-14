const express = require("express");
const router = express.Router();

const { obterCategorias} = require("../controllers/categoriaController");

router.get("/", obterCategorias); // Obter todas as categorias

module.exports = router;