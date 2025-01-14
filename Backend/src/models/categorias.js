const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoriasSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },
});

const Categoria = mongoose.model("Categoria", categoriasSchema);

module.exports = Categoria;