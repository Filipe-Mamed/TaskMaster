const express = require("express");
const router = express.Router();
const { auth } = require("../helpers/authMiddleware")

const { cadastrarFeedback } = require("../controllers/feedbackController");

router.post("/", auth, cadastrarFeedback); // Criar Feedback

module.exports = router;