const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryController');

/**
 * @swagger
 * /country:
 *   get:
 *     summary: Obtener todos los países
 *     tags:
 *       - Country
 *     responses:
 *       200:
 *         description: Lista de países
 *       404:
 *         description: No se encontraron países
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', countryController.getAllCountries);

/**
 * @swagger
 * /country/{id}:
 *   get:
 *     summary: Obtener un país por ID
 *     tags: [Country]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del país a obtener
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: País encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 addressIp:
 *                   type: string
 *                 flag_code:
 *                   type: string
 *       404:
 *         description: País no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: País no encontrado
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/:id', countryController.getCountryById);

/**
 * @swagger
 * /country:
 *   post:
 *     summary: Crear un nuevo país
 *     tags: [Country]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - addressIp
 *               - flag_code
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ecuador
 *               addressIp:
 *                 type: string
 *                 example: "190.215.112.45"
 *               flag_code:
 *                 type: string
 *                 example: "ec"
 *     responses:
 *       201:
 *         description: País creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: País creado correctamente
 *       400:
 *         description: Datos faltantes o error en creación (ej. país duplicado)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Faltan datos obligatorios
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post('/', countryController.createCountry);

/**
 * @swagger
 * /country/{id}:
 *   put:
 *     summary: Actualizar un país por ID
 *     tags: [Country]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del país a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - addressIp
 *               - flag_code
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ecuador
 *               addressIp:
 *                 type: string
 *                 example: "190.215.112.45"
 *               flag_code:
 *                 type: string
 *                 example: "ec"
 *     responses:
 *       200:
 *         description: País actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: País actualizado correctamente
 *       400:
 *         description: Datos faltantes o error en la actualización
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Faltan datos obligatorios
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.put('/:id', countryController.updateCountry);

/**
 * @swagger
 * /country/{id}:
 *   delete:
 *     summary: Eliminar un país por ID
 *     tags: [Country]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del país a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: País eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: País eliminado correctamente
 *       404:
 *         description: País no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: País no encontrado
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete('/:id', countryController.deleteCountry);

module.exports = router;
