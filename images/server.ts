import express from 'express'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: './config.env' })
const app = express()

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.get('/uploads', (req, res) => {
	res.json({ status: 'Server is working' })
})

const port = process.env.PORT || 8001

app.listen(port, () => {
	console.log(`Server is running on port ${port}...`)
})
