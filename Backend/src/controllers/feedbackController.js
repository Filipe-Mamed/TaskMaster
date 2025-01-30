const moment = require("moment-timezone");
const Feedback = require("../models/feedback");

// Cadastrar feedback
exports.cadastrarFeedback = (req, res) => {
  const { mensagem } = req.body;

  if (!mensagem) {
    return res
      .status(400)
      .json({ erros: [{ message: "Mensagem obrigatória!" }] });
  }

  const newFeedback = new Feedback({
    mensagem,
    usuario: req.user._id,
  });

  newFeedback
    .save()
    .then((feedback) => {
      res.status(201).json(feedback);
    })
    .catch((error) => {
      res.status(500).json({ error: "Erro ao cadastrar feedback.", error });
    });
};
