import express from 'express'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import cors from 'cors'
import { moviesRouter } from './routes/movies.js'
import { usersRouter } from './routes/users.js'


const app = express()

dotenv.config()

const PORT = process.env.PORT

const MONGO_URL = process.env.MONGO_URL

// const MONGO_URL = 'mongodb://localhost'

// Connect to MongoDB

async function createConnection() {
	const client = new MongoClient(MONGO_URL)
	await client.connect()
	console.log('Connected to MongoDB')
	return client
}

export const client = await createConnection()

// Add express middleware to parse JSON bodies automatically

app.use(express.json())

app.use(cors())

// Basic request handler
app.get('/', function (req, res) {
	res.send('Hello World')
})

// /movies -> router (separate file)
app.use('/movies', moviesRouter)
app.use('/users', usersRouter)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
