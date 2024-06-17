import { expect } from 'chai'
import sinon from 'sinon'
import type { Request, Response, NextFunction } from 'express'
import { MealController } from '../../src/presentation/controllers/MealController'
import { MealService } from '../../src/application/services/MealService'
import { Meal } from '../../src/core/domain/entities/Meal/Meal'

describe('mealController', () => {
	let mealServiceStub: sinon.SinonStubbedInstance<MealService>
	let mealControllerInstance: MealController

	beforeEach(() => {
		mealServiceStub = sinon.createStubInstance(MealService)
		mealControllerInstance = new MealController(mealServiceStub as unknown as MealService)
	})

	describe('getAllMeals', () => {
		it('Should return all meals', async () => {
			const req = {} as Request
			const res = {
				status: sinon.stub().returnsThis(),
				json: sinon.stub(),
			} as unknown as Response
			const next = sinon.stub() as unknown as NextFunction

			const meals = [
				new Meal('1', 'Meal 1', 10, 'Description 1', 'photo1.jpg'),
				new Meal('2', 'Meal 2', 15, 'Description 2', 'photo2.jpg'),
			]

			mealServiceStub.findAll.resolves(meals)

			await mealControllerInstance.getAllMeals(req, res, next)

			expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true
			expect(
				(res.json as sinon.SinonStub).calledWith({
					status: 'success',
					results: meals.length,
					data: meals,
				})
			).to.be.true
		})
	})

	describe('getMealbyId', () => {
		it('Should return a meal by ID', async () => {
			const req = { params: { id: '123' } } as unknown as Request
			const res = {
				status: sinon.stub().returnsThis(),
				json: sinon.stub(),
			} as unknown as Response
			const next = sinon.stub() as unknown as NextFunction

			const meal = new Meal('1', 'Meal 1', 10, 'Description 1', 'photo1.jpg')

			mealServiceStub.findById.resolves(meal)

			await mealControllerInstance.getMealById(req, res, next)

			expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true
			expect(
				(res.json as sinon.SinonStub).calledWith({
					status: 'success',
					data: meal,
				})
			).to.be.true
		})
	})

	describe('createMeal', () => {
		it('Should create a new meal', async () => {
			const req = {
				body: {
					name: 'Test Meal',
					price: 10,
					description: 'Test Description',
					photoPath: 'test.jpg',
				},
			} as Request
			const res = {
				status: sinon.stub().returnsThis(),
				json: sinon.stub(),
			} as unknown as Response
			const next = sinon.stub() as unknown as NextFunction

			const meal = new Meal('1', 'Test Meal', 10, 'Test Description', 'test.jpg')
			mealServiceStub.create.resolves(meal)

			await mealControllerInstance.createMeal(req, res, next)

			expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true
			expect(
				(res.json as sinon.SinonStub).calledWith({
					status: 'success',
					data: meal,
				})
			).to.be.true
		})
	})

	describe('updateMeal', () => {
		it('Should update a meal by id', async () => {
			const req = { params: { id: '123' }, body: { name: 'Updated Meal' } } as unknown as Request
			const res = {
				status: sinon.stub().returnsThis(),
				json: sinon.stub(),
			} as unknown as Response
			const next = sinon.stub() as unknown as NextFunction

			const updatedMeal = new Meal('123', 'Updated Meal', 10, 'Updated Description', 'updated.jpg')

			mealServiceStub.update.resolves(updatedMeal)

			await mealControllerInstance.updateMeal(req, res, next)

			expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true
			expect(
				(res.json as sinon.SinonStub).calledWith({
					status: 'success',
					data: updatedMeal,
				})
			).to.be.true
		})
	})

	describe('deleteMeal', () => {
		it('should delete a meal by id', async () => {
			const req = { params: { id: '123' } } as unknown as Request
			const res = {
				status: sinon.stub().returnsThis(),
				json: sinon.stub(),
			} as unknown as Response
			const next = sinon.stub() as unknown as NextFunction

			const meal = new Meal('123', 'Deleted Meal', 10, 'Description', 'photo.jpg')
			mealServiceStub.delete.resolves(meal)

			await mealControllerInstance.deleteMeal(req, res, next)

			expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true
			expect((res.json as sinon.SinonStub).calledWith({ status: 'success', data: null })).to.be.true
		})
	})
})
