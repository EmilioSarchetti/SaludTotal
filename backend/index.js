const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

// Servidor
app.listen(3001, () => {
  console.log('Servidor corriendo en http://localhost:3001');
});
