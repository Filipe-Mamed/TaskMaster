module.exports = {
    auth: function(req, res, next){
        // Verificar se o usuário está logado
        if(req.isAuthenticated()){
            return next(); // Se o usuário está autenticado, segue para a próxima função
        }else{
            // Se o usuário não está autenticado, retorna uma resposta 401 (Não autorizado)
            res.status(401).json({message: "Não autorizado. Por favor, faça login."})
        }
    }
}