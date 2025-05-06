const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todas las especialidades
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM especialidades';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener especialidades' });
    res.json(results);
  });
});

module.exports = router;
