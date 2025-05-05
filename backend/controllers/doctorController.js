const db = require('../db');

exports.crearDoctor = (req, res) => {
  const { usuario_id } = req.body;

  if (!usuario_id) {
    return res.status(400).json({ error: 'Falta el usuario_id' });
  }

  const sql = 'INSERT INTO doctores (usuario_id) VALUES (?)';
  db.query(sql, [usuario_id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al registrar doctor' });
    res.status(201).json({ mensaje: 'Doctor creado', doctor_id: result.insertId });
  });
};

exports.agregarEspecialidad = (req, res) => {
  const { doctor_id, especialidad_id } = req.body;

  if (!doctor_id || !especialidad_id) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  const sql = 'INSERT INTO doctor_especialidades (doctor_id, especialidad_id) VALUES (?, ?)';
  db.query(sql, [doctor_id, especialidad_id], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'Ya tiene esta especialidad asignada' });
      }
      return res.status(500).json({ error: 'Error al asignar especialidad' });
    }
    res.status(201).json({ mensaje: 'Especialidad asignada correctamente' });
  });
};


exports.obtenerDoctores = (req, res) => {
  const sql = `
    SELECT d.id AS doctor_id, u.nombre, u.email, 
           GROUP_CONCAT(e.nombre SEPARATOR ', ') AS especialidades
    FROM doctores d
    JOIN usuarios u ON d.usuario_id = u.id
    LEFT JOIN doctor_especialidades de ON d.id = de.doctor_id
    LEFT JOIN especialidades e ON de.especialidad_id = e.id
    GROUP BY d.id, u.nombre, u.email
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener doctores' });
    res.json(results);
  });
};
