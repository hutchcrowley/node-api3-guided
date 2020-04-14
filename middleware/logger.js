// custom logging middleware
module.exports = {
	logger,
	validateBody,
}

const logger = format => {
	return (req, res, next) => {
		switch (format) {
			case 'short':
				console.log(`${req.method} ${req.url}`)
				break
			case 'long':
			default:
				console.log(`${new Date().toISOString()} ${req.ip} ${req.method} ${req.url}`)
				break
		}
		next()
	}
}

const validateBody = () => {
	return (req, res, next) => {
		if (!req.body.name || !req.body.email) {
			res.status(400).json({
				message: 'Missing user name or eamil',
			})
		} else {
			next()
		}
	}
}

const validateUserId = () => {
	return (req, res, next) => {
		users
			.findById(req.params.id)
			.then(user => {
				if (user) {
					// make the user object available to later middleware
					req.user = user

					// middleware did what it was supposed to do (validate the user)
					// move on to the next piece of middleware
					next()
				} else {
					// if you want to tcancel the request from middleware, just dont call next
					res.status(404).json({
						message: 'User not found',
					})
				}
			})
			.catch(err => next(err))
	}
}
