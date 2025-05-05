const express = require('express');
const router = express.Router();
const { obtenerDoctores, crearDoctor } = require('../controllers/doctorController');

router.get('/', obtenerDoctores);
router.post('/', crearDoctor);

module.exports = router;
