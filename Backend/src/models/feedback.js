const mongoose = require("mongoose");
const moment = require("moment-timezone");
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  mensagem: {
    type: String,
    required: true,
  },

  dataCriacao: {
    type: Date,
    default: () => moment().tz("America/Sao_Paulo").toDate(),
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
