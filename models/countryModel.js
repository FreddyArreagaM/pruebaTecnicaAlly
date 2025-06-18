const db = require('../config/db'); 

// Llama al SP para obtener todos los países
const getAllCountries = (callback) => {
  const sql = 'CALL sp_get_all_countries(@messageError)';
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error ejecutando SP sp_get_all_countries:', err);
      return callback(err);
    }

    db.query('SELECT @messageError AS messageError', (err, output) => {
      if (err) {
        console.error('Error obteniendo messageError:', err);
        return callback(err);
      }

      const messageError = output[0].messageError;
      console.log('Mensaje desde SP sp_get_all_countries:', messageError);
      callback(null, results[0], messageError);
    });
  });
};

// Llama al SP para obtener un país por ID
const getCountryById = (id, callback) => {
    const sql = 'CALL sp_get_country_by_id(?, @messageError)';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error ejecutando SP sp_get_country_by_id:', err);
            return callback(err);
        }

        db.query('SELECT @messageError AS messageError', (err, output) => {
            if (err) {
                console.error('Error obteniendo messageError:', err);
                return callback(err);
            }

            const messageError = output[0].messageError;
            callback(null, results[0][0], messageError);
        });
    });
};

// Llama al SP para crear un nuevo país
const createCountry = (name, addressIp, flag_code, callback) => {
    const sql = 'CALL sp_create_country(?, ?, ?, @messageError)';
    db.query(sql, [name, addressIp, flag_code], (err) => {
        if (err) {
            console.error('Error ejecutando SP sp_create_country:', err);
            return callback(err);
        }

        db.query('SELECT @messageError AS messageError', (err, output) => {
            if (err) {
                console.error('Error obteniendo messageError:', err);
                return callback(err);
            }
            const messageError = output[0].messageError;
            callback(null, messageError);
        });
    });
};

// Llama al SP para actualizar un país
const updateCountry = (id, name, addressIp, flag_code, callback) => {
    const sql = 'CALL sp_update_country(?, ?, ?, ?, @messageError)';
    db.query(sql, [id, name, addressIp, flag_code], (err) => {
        if (err) {
            console.error('Error ejecutando SP sp_update_country:', err);
            return callback(err);
        }

        db.query('SELECT @messageError AS messageError', (err, output) => {
            if (err) {
                console.error('Error obteniendo messageError:', err);
                return callback(err);
            }
            const messageError = output[0].messageError;
            callback(null, messageError);
        });
    });
};

// Llama al SP para eliminar un país
const deleteCountry = (id, callback) => {
    const sql = 'CALL sp_delete_country(?, @messageError)';
    db.query(sql, [id], (err) => {
        if (err) {
            console.error('Error ejecutando SP sp_delete_country:', err);
            return callback(err);
        }

        db.query('SELECT @messageError AS messageError', (err, output) => {
            if (err) {
                console.error('Error obteniendo messageError:', err);
                return callback(err);
            }
            const messageError = output[0].messageError;
            callback(null, messageError);
        });
    });
};

module.exports = {
    getAllCountries,
    getCountryById,
    createCountry,
    updateCountry,
    deleteCountry
};