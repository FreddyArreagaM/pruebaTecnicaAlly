const db = require('../config/db');

// Llama al SP para crear una nueva tarea
const createTask = (description, status, callback) => {
  const sql = 'CALL sp_create_task(?, ?, @messageError)';
  db.query(sql, [description, status], (err) => {
    if (err) return callback(err);
    db.query('SELECT @messageError AS messageError', (err, result) => {
      if (err) return callback(err);
      callback(null, result[0].messageError);
    });
  });
};

// Llama al SP para obtener una tarea por ID
const getTaskById = (id, callback) => {
  const sql = 'CALL sp_get_task_by_id(?, @messageError)';
  db.query(sql, [id], (err, results) => {
    if (err) return callback(err);
    db.query('SELECT @messageError AS messageError', (err, output) => {
      if (err) return callback(err);
      callback(null, results[0][0], output[0].messageError);
    });
  });
};

// Llama al SP para actualizar una tarea
const updateTask = (id, description, status, callback) => {
  const sql = 'CALL sp_update_task(?, ?, ?, @messageError)';
  db.query(sql, [id, description, status], (err) => {
    if (err) return callback(err);
    db.query('SELECT @messageError AS messageError', (err, output) => {
      if (err) return callback(err);
      callback(null, output[0].messageError);
    });
  });
};

// Llama al SP para eliminar una tarea
const deleteTask = (id, callback) => {
  const sql = 'CALL sp_delete_task(?, @messageError)';
  db.query(sql, [id], (err) => {
    if (err) return callback(err);
    db.query('SELECT @messageError AS messageError', (err, output) => {
      if (err) return callback(err);
      callback(null, output[0].messageError);
    });
  });
};

// Llama al SP para obtener todas las tareas
const getAllTasks = (callback) => {
  const sql = 'CALL sp_get_all_tasks(@messageError)';
  db.query(sql, (err, results) => {
    if (err) return callback(err);
    db.query('SELECT @messageError AS messageError', (err, output) => {
      if (err) return callback(err);
      callback(null, results[0], output[0].messageError);
    });
  });
};

// Llama al SP para obtener las tareas pendientes
const getPendingTasks = (callback) => {
    const sql = 'CALL sp_get_pending_tasks(@messageError)';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error ejecutando SP sp_get_pending_tasks:', err);
            return callback(err);
        }

        db.query('SELECT @messageError AS messageError', (err, output) => {
            if (err) {
                console.error('Error obteniendo messageError:', err);
                return callback(err);
            }

            const messageError = output[0].messageError;
            callback(null, results[0], messageError);
        });
    });
};


module.exports = {
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  getAllTasks,
  getPendingTasks,
};
