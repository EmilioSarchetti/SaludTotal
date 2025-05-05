const express = require('express');
const router = express.Router();
const {
  crearTurno,
  turnosPorDoctor,
  turnosPorPaciente,
  cambiarEstadoTurno
} = require('../controllers/turnoController');

router.post('/', crearTurno);
router.get('/doctor/:id', turnosPorDoctor);
router.get('/paciente/:id', turnosPorPaciente);
router.put('/:id/estado', cambiarEstadoTurno);

module.exports = router;
