const express = require('express');
const cors = require('cors');
const app = express();

// Conexión a la base de datos
const db = require('./db');

// Rutas
const authRoutes = require('./routes/auth');
const usuarioRoutes = require('./routes/usuarios');
const doctorRoutes = require('./routes/doctores');
const turnoRoutes = require('./routes/turnos');
const adminRoutes = require('./routes/admin');
const especialidadRoutes = require('./routes/especialidades');


// Middleware
app.use(cors());
app.use(express.json());

// Usar rutas
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/doctores', doctorRoutes);
app.use('/api/turnos', turnoRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/especialidades', especialidadRoutes);


// Iniciar servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
