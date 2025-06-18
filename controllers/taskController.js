const tasksModel = require("../models/taskModel");

const createTask = (req, res) => {
  const { description, status } = req.body;
  tasksModel.createTask(description, status, (err, messageError) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: messageError });
  });
};

const getTaskById = (req, res) => {
  const { id } = req.params;
  tasksModel.getTaskById(id, (err, task, messageError) => {
    if (err) return res.status(500).json({ error: err.message });
    if (messageError !== "OK")
      return res.status(404).json({ message: messageError });
    res.json(task);
  });
};

const updateTask = (req, res) => {
  const { id } = req.params;
  const { description, status } = req.body;
  tasksModel.updateTask(id, description, status, (err, messageError) => {
    if (err) return res.status(500).json({ error: err.message });
    if (messageError !== "Tarea actualizada correctamente") {
      return res.status(400).json({ message: messageError });
    }
    res.json({ message: messageError });
  });
};

const deleteTask = (req, res) => {
  const { id } = req.params;
  tasksModel.deleteTask(id, (err, messageError) => {
    if (err) return res.status(500).json({ error: err.message });
    if (messageError !== "Tarea eliminada correctamente") {
      return res.status(404).json({ message: messageError });
    }
    res.json({ message: messageError });
  });
};

const getAllTasks = (req, res) => {
  tasksModel.getAllTasks((err, tasks, messageError) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ tasks, message: messageError });
  });
};

const getPendingTasks = (req, res) => {
  tasksModel.getPendingTasks((err, tasks, messageError) => {
    if (err)
      return res.status(500).json({ message: "Error interno del servidor" });

    if (messageError) return res.status(404).json({ message: messageError });

    return res.status(200).json({ tasks });
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
