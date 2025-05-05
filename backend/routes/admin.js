const express = require('express');
const router = express.Router();
const { verTodosLosTurnos } = require('../controllers/adminController');

router.get('/turnos', verTodosLosTurnos);

module.exports = router;
