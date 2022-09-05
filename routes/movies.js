import express from 'express'
import {
	getMovies,
	postMovie,
	getMovieById,
	deleteMovieById,
	editMovieById,
} from './helper.js'
import { auth } from '../middleware/auth.js'
import { ObjectId } from 'mongodb'

const router = express.Router()

router.get('/', auth, async function (req, res) {
	const filter = req.query
	if (filter.rating) {
		filter.rating = +filter.rating
	}

	const allMovies = await getMovies(filter)
	res.send(allMovies)
})

router.post('/', async function (req, res) {
	const newMovies = req.body
	const result = await postMovie(newMovies)
	res.send(result)
})

router.get('/:id', async function (req, res) {
	const id = ObjectId(req.params.id)
	const movie = await getMovieById(id)

	movie
		? res.send(movie)
		: res
				.status(404)
				.send(
					'<h1 style="text-align:center">Error 404<br/><hr/>Movie not found</h1>'
				)
})

router.delete('/deletemovie/:id', async function (req, res) {
	const id = ObjectId(req.params.id)
	const result = await deleteMovieById(id)
	res.send(result)
})

router.put('/editmovie/:id', async function (req, res) {
	const id = ObjectId(req.params.id)
	const movObj = req.body

	if (movObj.rating) {
		movObj.rating = +movObj.rating
	}

	const result = await editMovieById(id, movObj)
	res.send(result)
})

export const moviesRouter = router
