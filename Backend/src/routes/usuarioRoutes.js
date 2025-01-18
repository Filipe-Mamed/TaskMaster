const express = require("express");
const router = express.Router();

const {
  registrar,
  login,
  sair,
} = require("../controllers/usuarioController")

router.post("/registrar", registrar); // Registar Usuario
router.post("/login", login); // Fazer Login
router.get("/sair", sair); // Sair

module.exports = router;