const db = require('../db');

exports.registrarUsuario = (req, res) => {
  const { nombre, email, contrasena, tipo_usuario } = req.body;

  if (!nombre || !email || !contrasena || !tipo_usuario) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  const sql = 'INSERT INTO usuarios (nombre, email, contrasena, tipo_usuario) VALUES (?, ?, ?, ?)';
  db.query(sql, [nombre, email, contrasena, tipo_usuario], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Email ya registrado' });
      return res.status(500).json({ error: 'Error al registrar' });
    }

    // Si es paciente, crear en tabla pacientes
    if (tipo_usuario === 'paciente') {
      const pacienteSql = 'INSERT INTO pacientes (usuario_id) VALUES (?)';
      db.query(pacienteSql, [result.insertId], (err2) => {
        if (err2) return res.status(500).json({ error: 'Usuario creado, error al crear paciente' });
        res.status(201).json({ mensaje: 'Paciente registrado correctamente' });
      });
    } else {
      res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
    }
  });
};

exports.loginUsuario = (req, res) => {
  const { email, contrasena } = req.body;

  const sql = 'SELECT * FROM usuarios WHERE email = ? AND contrasena = ?';
  db.query(sql, [email, contrasena], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error en login' });
    if (results.length === 0) return res.status(401).json({ error: 'Credenciales incorrectas' });

    res.json({ mensaje: 'Login exitoso', usuario: results[0] });
  });
};
