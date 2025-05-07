import { Request, Response } from 'express'
import { Inject, Service } from 'typedi'
import { AuthService } from '../services/auth.service'

@Service()
export class AuthController {
	#_authService: AuthService

	constructor(@Inject() authService: AuthService) {
		this.#_authService = authService
	}

	async register(req: Request, res: Response): Promise<void> {
		console.log('Registering user...')
		console.log('Request body:', req.body)
		console.log('Request headers:', req.headers)

		const { username, password } = req.body

		if (!username || !password) {
			res.status(400).json({ message: 'Missing username or password' })
			return
		}

		await this.#_authService.register(username, password)

		res.status(201).json({ message: 'User registered successfully' })
	}

	async login(req: Request, res: Response): Promise<void> {
		const { username, password } = req.body

		if (!username || !password) {
			res.status(400).json({ message: 'Missing username or password' })
			return
		}

		const token = await this.#_authService.login(username, password)

		if (!token) {
			res.status(401).json({ message: 'Invalid credentials' })
			return
		}

		res.json({ token })
	}

	async verifyToken(req: Request, res: Response, next: Function): Promise<void> {
		const token = req.headers['authorization']?.split(' ')[1]

		if (!token) {
			res.status(401).json({ message: 'No token provided' })
			return
		}

		try {
			const decoded = this.#_authService.verifyToken(token)

			next()
		} catch (error) {
			res.status(401).json({ message: 'Invalid token' })
		}
	}
}
