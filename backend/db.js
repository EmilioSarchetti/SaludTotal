const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'SaludTotal'
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar con la BD:', err);
    return;
  }
  console.log('Conectado a la base de datos SaludTotal');
});

module.exports = db;
