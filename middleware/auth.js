// custom middleware
import jwt from 'jsonwebtoken'
import jwtDecode from 'jwt-decode'

export const auth = (req, res, next) => {
	try {
		const token = req.header('x-auth-token')
		jwt.verify(token, process.env.SECRET)
		console.log(jwtDecode(token))
		next()
	} catch (e) {
		res.status(401).send({ Message: e })
	}
}
