const db = require('../config/db');

// Llama al SP para crear un nuevo usuario
const createUser = (name, email, hashedPassword, callback) => {
  const callSP = 'CALL sp_create_user(?, ?, ?, @messageError)';
  db.query(callSP, [name, email, hashedPassword], (err) => {
    if (err) {
      console.error('Error ejecutando SP:', err);
      return callback(err);
    }

    db.query('SELECT @messageError AS messageError', (err, results) => {
      if (err) {
        console.error('Error al obtener el messageError:', err);
        return callback(err);
      }

      const messageError = results[0].messageError;
      console.log('Mensaje desde SP:', messageError);

      return callback(null, results, messageError);
    });
  });
};

// Llama al SP para buscar usuario por email
const findUserByEmail = (email, callback) => {
  const sql = 'CALL sp_find_user_by_email(?, @messageError)';
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error('Error ejecutando SP sp_find_user_by_email:', err);
      return callback(err);
    }

    db.query('SELECT @messageError AS messageError', (err, output) => {
      if (err) {
        console.error('Error obteniendo messageError:', err);
        return callback(err);
      }

      const messageError = output[0].messageError;
      console.log('Mensaje desde SP sp_find_user_by_email:', messageError);
      callback(null, results[0], messageError);
    });
  });
};

// Llama al SP para actualizar último login
const updateLastLogin = (userId, callback) => {
  const sql = 'CALL sp_update_last_login(?, @messageError)';
  db.query(sql, [userId], (err) => {
    if (err) {
      console.error('Error ejecutando SP sp_update_last_login:', err);
      return callback(err);
    }

    db.query('SELECT @messageError AS messageError', (err, output) => {
      if (err) {
        console.error('Error obteniendo messageError:', err);
        return callback(err);
      }

      const messageError = output[0].messageError;
      console.log('Mensaje desde SP sp_update_last_login:', messageError);
      callback(null, null, messageError);
    });
  });
};

// Llama al SP para obtener todos los usuarios
const getAllUsers = (callback) => {
  const sql = 'CALL sp_get_all_users(@messageError)';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error ejecutando SP sp_get_all_users:', err);
      return callback(err);
    }

    db.query('SELECT @messageError AS messageError', (err, output) => {
      if (err) {
        console.error('Error obteniendo messageError:', err);
        return callback(err);
      }

      const messageError = output[0].messageError;
      console.log('Mensaje desde SP sp_get_all_users:', messageError);
      callback(null, results[0], messageError);
    });
  });
};

module.exports = {
    createUser,
    findUserByEmail,
    updateLastLogin,
    getAllUsers
};