const db = require('../db');

exports.verTodosLosTurnos = (req, res) => {
  const sql = `
    SELECT t.id, t.fecha, t.hora, t.estado,
           p_u.nombre AS paciente, d_u.nombre AS doctor
    FROM turnos t
    JOIN pacientes p ON t.paciente_id = p.id
    JOIN usuarios p_u ON p.usuario_id = p_u.id
    JOIN doctores d ON t.doctor_id = d.id
    JOIN usuarios d_u ON d.usuario_id = d_u.id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener todos los turnos' });
    res.json(results);
  });
};
