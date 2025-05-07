import { Router } from 'express'
import { Container } from 'typedi'
import { AuthController } from '../controllers/auth.controller'
import { QrController } from '../controllers/qr.controller'

const qrRouter = Router()
const qrController = Container.get(QrController)
const authController = Container.get(AuthController)

/**
 * @swagger
 * /factorize:
 *   post:
 *     summary: Factoriza una matriz
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
 *       401:
 *         description: Unauthorized
 *       403:
 *        description: Forbidden
 */
qrRouter.post('/factorize', authController.verifyToken.bind(authController), (req, res) => qrController.factorize(req, res))

/**
 * @swagger
 * /rotate:
 *   post:
 *     summary: Rota una matriz
 *     security: []
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
qrRouter.post('/rotate', (req, res) => qrController.rotate(req, res))

export default qrRouter
