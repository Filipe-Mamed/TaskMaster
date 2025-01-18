require("dotenv").config();
const express = require("express");
require("./config/dbConfig");
const cors = require("cors");
require("./config/passportConfig");
const session = require("./config/sessionConfig");
const passport = require('passport');

// Cria uma aplicação express
const server = express();
// Middleware para interpretar requisições com corpo no formato JSON
server.use(express.json());
// Middleware para permitir requisições de diferentes origens (cross-origin)
server.use(cors());

// Configuração do express-session
session(server);

// Inicialização do Passport.js
server.use(passport.initialize());
server.use(passport.session());

// Rotas
// Configura as rotas para tarefas
server.use("/api/tarefas", require("./routes/taskRoutes"));
// Configura as rotas para categorias
server.use("/api/categorias", require("./routes/categoriaRoutes"));
// Configura as rotas para o feedback
server.use("/api/feedback", require("./routes/feedbackRoutes"));
// Configuras as rotas para o dashboard
server.use("/api/dashboard", require("./routes/dashboardRoutes"));
// Configura as rotas para Login e Registrar
server.use("/api/login", require("./routes/usuarioRoutes"))

// Porta
const porta = process.env.PORT || 2000;

// Inicia o servidor na porta especificada
server.listen(porta, function () {
  console.log(`🚀 Servidor rodando em http://localhost:${porta}/`);
});
