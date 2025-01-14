require('dotenv').config()
const express = require("express")
require('./config/dbConfig')
const cors = require('cors')

const server = express()
server.use(express.json())
server.use(cors())


// Rotas
// Configura as rotas para tarefas
server.use('/api/tarefas', require('./routes/taskRoutes'))
// Configura as rotas para categorias
server.use('/api/categorias', require('./routes/categoriaRoutes'))
// Rotas para o feedback
server.use('/api/feedback', require('./routes/feedbackRoutes'))
// Rotas para o dashboard
server.use('/api/dashboard', require('./routes/dashboardRoutes'))

// Porta
const porta = process.env.PORT || 2000

server.listen(porta, function(){
    console.log(`🚀 Servidor rodando em http://localhost:${porta}/`);
})