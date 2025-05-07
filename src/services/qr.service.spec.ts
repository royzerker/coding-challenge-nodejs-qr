import 'reflect-metadata'
import { Container } from 'typedi'
import { createLogger } from 'winston'
import { registerDependencies } from '../loaders/dependency-injector'
import { QrService } from './qr.service'

beforeEach(() => {
	registerDependencies()
})

describe('QrService with typedi', () => {
	const mockLogger = createLogger()
	const mockAxios = { post: jest.fn() }

	beforeAll(() => {
		Container.set('logger', mockLogger)
		Container.set('axios', mockAxios)
	})

	it('should rotate a matrix correctly', async () => {
		const qrService = Container.get(QrService)

		const matrix = [
			[1, 2],
			[3, 4]
		]
		const { rotatedQ, rotatedR } = await qrService.rotate(matrix, matrix)

		expect(rotatedQ).toEqual([
			[3, 1],
			[4, 2]
		])
		expect(rotatedR).toEqual([
			[3, 1],
			[4, 2]
		])
	})
})
