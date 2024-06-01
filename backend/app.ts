import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { AppError } from './utils/AppError'
import { router as mealRouter } from './src/presentation/routes/mealRouter'
import { router as userRouter } from './src/presentation/routes/userRouter'
import { router as tableRouter } from './src/presentation/routes/tableRouter'
import { router as orderRouter } from './src/presentation/routes/orderRouter'
import { globalErrorHandler } from './src/presentation/middleware/errorHandler'

dotenv.config({ path: './config.env' })
const app = express()

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

app.use(express.json())
app.use(cookieParser())
app.use(
	cors({
		origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
		credentials: true,
	})
)

app.use('/api/v1/meals', mealRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/tables', tableRouter)
app.use('/api/v1/orders', orderRouter)

app.all('*', (req, res, next) => {
	const err = new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
	next(err)
})

app.use(globalErrorHandler)

export { app }
