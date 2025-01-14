const express = require("express");
const router = express.Router();

const { cadastrarFeedback } = require("../controllers/feedbackController");

router.post("/", cadastrarFeedback); // Criar Feedback

module.exports = router;