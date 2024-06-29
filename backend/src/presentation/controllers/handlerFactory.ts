import crypto from 'crypto'
import type { Request, Response, NextFunction } from 'express'
import { AppError } from '../../../utils/AppError'
import { Meal } from '../../core/domain/entities/Meal/Meal'
import { Table } from '../../core/domain/entities/Table/Table'
import { Order } from '../../core/domain/entities/Order/Order'

export const createOne =
	(type: 'Meal' | 'Table' | 'Order', service: any) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			let entity
			if (type === 'Meal') {
				const id = crypto.randomUUID()
				const { name, price, description, photoPath } = req.body
				entity = new Meal(id, name, price, description, photoPath)
			} else if (type === 'Table') {
				const id = crypto.randomUUID()
				const { tableNumber, status } = req.body
				entity = new Table(id, tableNumber, status)
			} else if (type === 'Order') {
				const id = crypto.randomUUID()
				const { tableNumber, meals } = req.body
				const createdAt: Date = new Date(Date.now())
				entity = new Order(id, tableNumber, meals, 'pending', createdAt)
			}

			if (!entity) return

			const createdDoc = await service.create(entity)
			res.status(201).json({
				status: 'success',
				data: createdDoc,
			})
		} catch (error) {
			next(error)
		}
	}

export const getAll = (service: any) => async (req: Request, res: Response, next: NextFunction) => {
	try {
		const docs = await service.findAll()
		res.status(200).json({
			status: 'success',
			results: docs.length,
			data: docs,
		})
	} catch (error) {
		next(error)
	}
}

export const getOne = (service: any) => async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = req.params.id.toString()
		const doc = await service.findById(id)

		if (!doc) {
			return next(new AppError('Document not found', 404))
		}

		res.status(200).json({
			status: 'success',
			data: doc,
		})
	} catch (error) {
		next(error)
	}
}

export const updateOne =
	(service: any) => async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id.toString()
			const updateData = req.body
			const updatedDoc = await service.update(id, updateData)

			if (!updatedDoc) {
				return next(new AppError('Document not found', 404))
			}

			res.status(200).json({
				status: 'success',
				data: updatedDoc,
			})
		} catch (error) {
			next(error)
		}
	}

export const deleteOne =
	(service: any) => async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id.toString()
			const doc = await service.delete(id)

			if (!doc) {
				return next(new AppError('Document not found', 404))
			}

			res.status(204).json({
				status: 'success',
				data: null,
			})
		} catch (error) {
			next(error)
		}
	}
