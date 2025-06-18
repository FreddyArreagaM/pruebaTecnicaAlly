const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/taskController');

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API para gestionar tareas
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - description
 *               - status
 *             properties:
 *               description:
 *                 type: string
 *                 example: "Aprender un nuevo framework"
 *               status:
 *                 type: string
 *                 enum: [C, P]
 *                 example: "P"
 *     responses:
 *       200:
 *         description: Tarea creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post('/', tasksController.createTask);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Obtener todas las tareas
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       description:
 *                         type: string
 *                       status:
 *                         type: string
 *                 message:
 *                   type: string
 */
router.get('/', tasksController.getAllTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Actualizar una tarea por ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - description
 *               - status
 *             properties:
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [C, P]
 *     responses:
 *       200:
 *         description: Tarea actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Error en la solicitud (estado inválido o tarea no encontrada)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.put('/:id', tasksController.updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea por ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea a eliminar
 *     responses:
 *       200:
 *         description: Tarea eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete('/:id', tasksController.deleteTask);

/**
 * @swagger
 * /tasks/pending:
 *   get:
 *     summary: Obtener todas las tareas pendientes
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Lista de tareas con estado pendiente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       description:
 *                         type: string
 *                       status:
 *                         type: string
 *                         enum: [P, C]
 *       500:
 *         description: Error interno del servidor
 */
router.get('/pending', tasksController.getPendingTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 description:
 *                   type: string
 *                 status:
 *                   type: string
 *       404:
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/:id', tasksController.getTaskById);

module.exports = router;
