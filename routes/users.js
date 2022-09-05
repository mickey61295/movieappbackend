import express from 'express'
import { genPassword, getUserbyName, verifyPassword } from './helper.js'
import { client } from '../index.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router()

router.post('/signup', async function (req, res) {
	const { username, password } = req.body
	const hashedPassword = await genPassword(password)
	const user = await getUserbyName(username)
	user
		? res.send(
				await client
					.db('classMongo')
					.collection('users')
					.insertOne({ username, password: hashedPassword })
		  )
		: res.status(400).send('User already exists')
})

router.post('/login', async function (req, res) {
	const { username, password } = req.body
	const user = await getUserbyName(username)
	console.log(user)
	if (user) {
		const hashedPassword = await verifyPassword(password, user[0].password)
		if (hashedPassword) {
			const token = jwt.sign(
				{ id: user[0]._id, name: username },
				process.env.SECRET
			)
			res.send({ message: "You're logged in", token: token })
		} else {
			res.status(400).send('Invalid Credentials')
		}
	} else {
		res.status(400).send('Invalid Credentials')
	}
})

router.get('/', async function (req, res) {
	const result = await client
		.db('classMongo')
		.collection('users')
		.find()
		.toArray()
	res.send(result)
})

export const usersRouter = router
