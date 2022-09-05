import { client } from '../index.js'
import bcrypt from 'bcrypt'

export async function editMovieById(id, movObj) {
	return await client
		.db('classMongo')
		.collection('movies')
		.updateOne({ _id: id }, { $set: movObj })
}
export async function deleteMovieById(id) {
	return await client
		.db('classMongo')
		.collection('movies')
		.deleteOne({ _id: id })
}
export async function getMovieById(id) {
	return await client.db('classMongo').collection('movies').findOne({
		_id: id,
	})
}
export async function postMovie(newMovies) {
	return await client
		.db('classMongo')
		.collection('movies')
		.insertMany(newMovies)
}
export async function getMovies(filter) {
	return await client
		.db('classMongo')
		.collection('movies')
		.find(filter)
		.toArray()
}

export async function genPassword(password) {
	const NO_OF_ROUNDS = 10
	const salt = await bcrypt.genSalt(NO_OF_ROUNDS)
	const hashedPassword = await bcrypt.hash(password, salt)
	return hashedPassword
}

export async function getUserbyName(username) {
	return await client
		.db('classMongo')
		.collection('users')
		.find({ username: username })
		.toArray()
}

export async function verifyPassword(password, userPassword) {
	return await bcrypt.compare(password, userPassword)
}