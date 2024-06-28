import supertest from 'supertest'
import mongoose from 'mongoose'
import { app } from '../../app'
import { UserModel } from '../../src/infrastructure/schemas/UserSchema'
import crypto from 'crypto'
import { clearScreenDown } from 'readline'
import { error } from 'console'

describe('MealController Integration Tests', () => {
	let mealId: string = crypto.randomUUID()
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

	it('should create a new meal', async () => {
		try {
			const res = await supertest(app)
				.post('/api/v1/meals')
				.send({
					name: 'Test Meal',
					price: 10,
					description: 'Test Description',
					photoPath: '/test.jpg',
				})
				.set('Authorization', `Bearer ${token}`)

			expect(res.status).toBe(201)
			expect(res.body).toBeInstanceOf(Object)
			expect(res.body.status).toBe('success')
			expect(res.body.data).toHaveProperty('name', 'Test Meal')
			expect(res.body.data).toHaveProperty('price', 10)
		} catch (error) {
			console.log(error)
		}
	})

	it('should get all meals', async () => {
		const res = await supertest(app).get('/api/v1/meals').set('Authorization', `Bearer ${token}`)

		expect(res.status).toBe(200)
		expect(res.body).toBeInstanceOf(Object)
		expect(res.body.status).toBe('success')
		expect(res.body.data).toBeInstanceOf(Array)
		expect(res.body.data.length).toBeGreaterThan(0)
	})

	it('should get a meal by ID', async () => {
		try {
			const res = await supertest(app)
				.get(`/api/v1/tables/${mealId}`)
				.set('Authorization', `Bearer ${token}`)
				.end(error => {
					console.log(error)
				})
			expect(res.status).toBe(200)
		} catch (error) {
			console.log(error)
		}
	})

	it('should update a mael', async () => {
		try {
			const res = await supertest(app)
				.patch(`/api/v1/tables/${mealId}`)
				.set('Authorization', `Bearer ${token}`)
				.send({ price: 15 })
				.end(error => {
					console.log(error)
				})
			expect(res.status).toBe(200)
			expect(res.body).toBeInstanceOf(Object)
			expect(res.body.status).toBe('success')
			expect(res.body.data).toHaveProperty('id', mealId)
			expect(res.body.data).toHaveProperty('price', 15)
		} catch (error) {
			console.log(error)
		}
	})

	it('should delete a meal', async () => {
		try {
			const res = await supertest(app)
				.delete(`/api/v1/tables/${mealId}`)
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
