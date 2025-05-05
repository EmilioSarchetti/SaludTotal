const db = require('../db');

exports.crearTurno = (req, res) => {
  const { paciente_id, doctor_id, fecha, hora } = req.body;
  const sql = 'INSERT INTO turnos (paciente_id, doctor_id, fecha, hora) VALUES (?, ?, ?, ?)';
  db.query(sql, [paciente_id, doctor_id, fecha, hora], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al solicitar turno' });
    res.status(201).json({ mensaje: 'Turno solicitado', id: result.insertId });
  });
};

exports.turnosPorDoctor = (req, res) => {
  const sql = `
    SELECT t.*, u.nombre AS paciente
    FROM turnos t
    JOIN pacientes p ON t.paciente_id = p.id
    JOIN usuarios u ON p.usuario_id = u.id
    WHERE t.doctor_id = ?
  `;
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener turnos' });
    res.json(results);
  });
};

exports.turnosPorPaciente = (req, res) => {
  const sql = `
    SELECT t.*, u.nombre AS doctor
    FROM turnos t
    JOIN doctores d ON t.doctor_id = d.id
    JOIN usuarios u ON d.usuario_id = u.id
    WHERE t.paciente_id = ?
  `;
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener turnos' });
    res.json(results);
  });
};

exports.cambiarEstadoTurno = (req, res) => {
  const { estado } = req.body;
  const sql = 'UPDATE turnos SET estado = ? WHERE id = ?';
  db.query(sql, [estado, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar estado' });
    res.json({ mensaje: 'Estado actualizado' });
  });
};
