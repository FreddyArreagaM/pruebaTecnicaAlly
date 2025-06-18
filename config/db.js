const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db_pruebaally',
    multipleStatements: true
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conexión a MySQL exitosa');
});

module.exports = db;
