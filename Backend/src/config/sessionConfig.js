const session = require('express-session');

// Configurando sessão
module.exports = function (server) {
    server.use(session({
        secret: process.env.SESSION_SECRET, // Chave secreta usada para assinar a sessão
        resave: false, // Evita que a sessão seja salva novamente se não for modificada
        saveUninitialized: false, // Evita salvar sessões não inicializadas
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 1 dia // Define a duração do cookie para 1 dia
            httpOnly: true, // Garante que o cookie só esteja acessível via HTTP(S), e não client-side scripts
            secure: false // Define o cookie como seguro (deve ser true em produção, com HTTPS)
        }
    }));
};