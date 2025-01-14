const mongoose = require("mongoose")


// Configurando o mongoose
mongoose.connect(process.env.DB_CONNECTION).then(function() {
    console.log('Conectado ao MongoDB!');
}).catch(function(erro) {
    console.log('Não conseguiu se conectar com o MongoDB:', erro);
});




