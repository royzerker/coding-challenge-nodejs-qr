import axios from 'axios'
import { Container } from 'typedi'
import type { Logger } from 'winston'
import { createLogger, format, transports } from 'winston'

export function registerDependencies() {
	const logger: Logger = createLogger({
		level: 'info',
		format: format.combine(
			format.colorize(),
			format.timestamp(),
			format.printf(({ timestamp, level, message }) => {
				return `${timestamp} [${level}]: ${message}`
			})
		),
		transports: [
			new transports.Console({
				format: format.combine(format.colorize(), format.simple())
			})
		]
	})
	Container.set('logger', logger)

	const axiosInstance = axios.create()
	Container.set('axios', axiosInstance)
}
