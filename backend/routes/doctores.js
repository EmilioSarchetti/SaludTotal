const express = require('express');
const router = express.Router();
const {obtenerDoctores,crearDoctor,agregarEspecialidad } = require('../controllers/doctorController');

router.get('/', obtenerDoctores);
router.post('/', crearDoctor);
router.post('/especialidad', agregarEspecialidad);

module.exports = router;
