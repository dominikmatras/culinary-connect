import { app } from './app'
import mongoose from 'mongoose'

process.on('uncaughtException', err => {
	console.log(err)
	console.log('Unhandled exception! Shutting down...')
	process.exit(1)
})

const DB = process.env.DATABASE?.replace('<PASSWORD>', process.env.DATABASE_PASSWORD ?? '') ?? ''

mongoose
	.connect(DB)
	.then(() => {
		console.log('DB connection successful!')
	})
	.catch(err => {
		console.log(err)
		console.log('Cannot connect to the database!')
		process.exit(1)
	})

const port = process.env.PORT || 8000

const server = app.listen(port, () => {
	console.log(`App is running on port ${port}...`)
})

process.on('unhandledRejection', err => {
	console.log(err)

	console.log('Unhandled rejection! Shutting down...')
	server.close(() => {
		process.exit(1)
	})
})
