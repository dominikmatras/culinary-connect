import supertest from 'supertest'
import mongoose from 'mongoose'
import { app } from '../../app'
import { UserModel } from '../../src/infrastructure/schemas/UserSchema'
import crypto from 'crypto'
import { clearScreenDown } from 'readline'
import { error } from 'console'

describe('TableController Integration Tests', () => {
	let tableId: string = crypto.randomUUID()
	let token: string
	const userId = new mongoose.Types.ObjectId().toString()

	const databaseConnection =
		process.env.DATABASE?.replace('<PASSWORD>', process.env.DATABASE_PASSWORD ?? '') ?? ''

	beforeAll(async () => {
		await mongoose.connect(`${databaseConnection}`)

		const user = new UserModel({
			id: userId,
			name: 'Test User',
			email: 'testowy@onet.pl',
			role: 'manager',
			password: '123456789',
			passwordConfirm: '123456789',
		})
		await user.save()
		const res = await supertest(app)
			.post('/api/v1/users/login')
			.send({ email: 'testowy@onet.pl', password: '123456789' })
		token = res.body.token
	})

	afterAll(async () => {
		await UserModel.deleteOne({ id: userId })
		await mongoose.connection.close()
	})

	it('should create a new table', async () => {
		try {
			const res = await supertest(app)
				.post('/api/v1/tables')
				.send({ tableNumber: crypto.randomUUID(), status: 'available' })
				.set('Authorization', `Bearer ${token}`)
				.end(error => {
					console.log(error)
				})
			tableId = res.body.data.id
			expect(res.status).toBe(201)
			expect(res.body).toBeInstanceOf(Object)
			expect(res.body.status).toBe('success')
			expect(res.body.data).toHaveProperty('tableNumber', tableId)
			expect(res.body.data).toHaveProperty('status', 'available')
		} catch (error) {
			console.log(error)
		}
	})

	it('should get all tables', async () => {
		const res = await supertest(app).get('/api/v1/tables').set('Authorization', `Bearer ${token}`)

		expect(res.status).toBe(200)
		expect(res.body).toBeInstanceOf(Object)
		expect(res.body.status).toBe('success')
		expect(res.body.data).toBeInstanceOf(Array)
		expect(res.body.data.length).toBeGreaterThan(0)
	})

	// Up - WORKING!!

	it('should get a table by ID', () => {
		try {
			const res = supertest(app)
				.get(`/api/v1/tables/${tableId}`)
				.set('Authorization', `Bearer ${token}`)
				.end(error => {
					console.log(error)
				})
		} catch (error) {
			console.log(error)
		}
	})

	it('should update a table', async () => {
		try {
			const res = await supertest(app)
				.patch(`/api/v1/tables/${tableId}`)
				.set('Authorization', `Bearer ${token}`)
				.send({ status: 'occupied' })
				.end(error => {
					console.log(error)
				})
			expect(res.status).toBe(200)
			expect(res.body).toBeInstanceOf(Object)
			expect(res.body.status).toBe('success')
			expect(res.body.data).toHaveProperty('id', tableId)
			expect(res.body.data).toHaveProperty('status', 'occupied')
		} catch (error) {
			console.log(error)
		}
	})

	it('should delete a table', async () => {
		try {
			const res = await supertest(app)
				.delete(`/api/v1/tables/${tableId}`)
				.set('Authorization', `Bearer ${token}`)
				.end(error => {
					console.log(error)
				})
			expect(res.status).toBe(204)
		} catch (error) {
			console.log(error)
		}
	})
})
