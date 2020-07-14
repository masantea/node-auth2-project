const bcrypt = require("bcryptjs")
const Users = require("../users/users-model")

function restrict() {
	const authError = {
		message: "Invalid credentials",
	}
	
	return async (req, res, next) => {
		try {
// 			const { username, password } = req.headers
// 			// make sure the values are not empty
// 			if (!username || !password) {
// 				return res.status(401).json(authError)
// 			}
// 
// 			const user = await Users.findBy({ username }).first()
// 			// make sure the user exists in the database
// 			if (!user) {
// 				return res.status(401).json(authError)
// 			}
// 
// 			const passwordValid = await bcrypt.compare(password, user.password)
// 			// make sure the password is correct
// 			if (!passwordValid) {
// 				return res.status(401).json(authError)
// 			}

			if (!req.session || !req.session.user) {
				return res.status(401).json(authError)
			}

			// if we reach this point, the user is considered authorized!
			next()
		} catch (err) {
			next(err)
		}
	}
}

module.exports = restrict





// const jwt = require("jsonwebtoken")

// const roles = [
// 	"normal",
// 	"admin",
// ]

// function restrict(role) {
// 	return async (req, res, next) => {
// 		const authError = {
// 			message: "Invalid credentials",
// 		}

// 		try {
// 			// manually pull the token that got sent from the client's cookie jar
// 			const token = req.cookies.token
// 			if (!token) {
// 				return res.status(401).json(authError)
// 			}

// 			// checks to make sure the signature is valid and the token is not expired
// 			jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
// 				if (err) {
// 					return res.status(401).json(authError)
// 				}

// 				// check if the role in our token is above or equal to the required role for the endpoint
// 				if (role && roles.indexOf(decoded.userRole) < roles.indexOf(role)) {
// 					return res.status(401).json(authError)
// 				}

// 				next()
// 			})
// 		} catch(err) {
// 			next(err)
// 		}
// 	}
// }

// module.exports = restrict