import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Inject, Service } from 'typedi'
import { Logger } from 'winston'

@Service()
export class AuthService {
	readonly #_logger: Logger
	readonly #_jwtSecret: jwt.Secret = process.env.JWT_SECRET || 'defaultSecret'
	readonly #_jwtExpiresIn: string | number = process.env.JWT_EXPIRES_IN || '1h'

	#_users: Map<
		string,
		{
			password: string
		}
	> = new Map()

	constructor(@Inject('logger') logger: Logger) {
		this.#_logger = logger
	}

	async register(username: string, password: string): Promise<void> {
		this.#_logger.info(`inside register`)

		if (this.#_users.has(username)) {
			this.#_logger.error(`User already exists`)
			throw new Error('User already exists')
		}

		const hashedPassword = await bcrypt.hash(password, 10)
		this.#_users.set(username, { password: hashedPassword })
	}

	async login(username: string, password: string): Promise<string> {
		this.#_logger.info(`inside login`)

		const user = this.#_users.get(username)

		if (!user) {
			this.#_logger.error(`User not found`)
			throw new Error('User not found')
		}

		const isValid = await bcrypt.compare(password, user.password)

		if (!isValid) {
			this.#_logger.error(`Invalid password`)
			throw new Error('Invalid password')
		}

		const token = jwt.sign({ username }, this.#_jwtSecret as jwt.Secret, {
			expiresIn: this.#_jwtExpiresIn as number | undefined
		})

		this.#_logger.info(`Token generated for user ${username}`)

		return token
	}

	async logout(username: string): Promise<void> {
		this.#_logger.info(`inside logout`)

		if (!this.#_users.has(username)) {
			this.#_logger.error(`User not found`)
			throw new Error('User not found')
		}

		this.#_users.delete(username)
	}

	verifyToken(token: string): string | jwt.JwtPayload {
		this.#_logger.info(`inside verifyToken`)

		const decoded = jwt.verify(token, this.#_jwtSecret)

		if (!decoded) {
			this.#_logger.error(`Invalid token`)
			throw new Error('Invalid token')
		}

		this.#_logger.info(`Token verified successfully`)

		return decoded
	}
}
