import { Router } from 'express'
import { Container } from 'typedi'
import { AuthController } from '../controllers/auth.controller'

const authRouter = Router()
const authController = Container.get(AuthController)

authRouter.post('/register', (req, res) => authController.register(req, res))
authRouter.post('/login', (req, res) => authController.login(req, res))

export default authRouter
