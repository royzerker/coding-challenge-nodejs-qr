"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const qr_controller_1 = require("../controllers/qr.controller");
const typedi_1 = require("typedi");
const router = (0, express_1.Router)();
const qrController = typedi_1.Container.get(qr_controller_1.QrController);
/**
 * @swagger
 * /factorize:
 *   post:
 *     summary: Factoriza una matriz
 *     tags:
 *       - API
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               matrix:
 *                 type: array
 *                 items:
 *                   type: array
 *                   items:
 *                     type: number
 *     responses:
 *       200:
 *         description: Matriz factorizada
 */
router.post('/factorize', (req, res) => qrController.factorize(req, res));
/**
 * @swagger
 * /rotate:
 *   post:
 *     summary: Rota una matriz
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               matrix:
 *                 type: array
 *                 items:
 *                   type: array
 *                   items:
 *                     type: number
 *     responses:
 *       200:
 *         description: Matriz rotada
 */
router.post('/rotate', (req, res) => qrController.rotate(req, res));
exports.default = router;
