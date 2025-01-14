const express = require("express");
const router = express.Router();
const { obterDashboardData } = require('../controllers/dashboardController')


router.get("/dados", obterDashboardData); // Obter dados no Dashboard

module.exports = router;