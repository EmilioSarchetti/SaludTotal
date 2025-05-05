const db = require('../db');

exports.obtenerDoctores = (req, res) => {
  const sql = `
    SELECT d.id, u.nombre, u.email, e.nombre AS especialidad
    FROM doctores d
    JOIN usuarios u ON d.usuario_id = u.id
    JOIN especialidades e ON d.especialidad_id = e.id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener doctores' });
    res.json(results);
  });
};

exports.crearDoctor = (req, res) => {
  const { usuario_id, especialidad_id } = req.body;
  const sql = 'INSERT INTO doctores (usuario_id, especialidad_id) VALUES (?, ?)';
  db.query(sql, [usuario_id, especialidad_id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al registrar doctor' });
    res.status(201).json({ mensaje: 'Doctor registrado', id: result.insertId });
  });
};
