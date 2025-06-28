const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/medicos-por-especialidad/:especialidadId', adminController.listarMedicosPorEspecialidad);
router.get('/pacientes-atendidos/:doctorId', adminController.contarPacientesAtendidos);
router.post('/registrar-medico', adminController.registrarMedico);
router.get('/formularios', adminController.obtenerFormularios);
router.post('/crear-admin', adminController.crearAdministrador);

module.exports = router;
