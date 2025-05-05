const db = require('../db');

exports.obtenerUsuarios = (req, res) => {
  const sql = 'SELECT id, nombre, email, tipo_usuario FROM usuarios';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener usuarios' });
    res.json(results);
  });
};
