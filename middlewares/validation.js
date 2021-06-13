const ApiError = require("../helpers/api-error")

const validation = (schema) => (req, res, next) => {
    const {error} = schema.validate(req.body)
    if(error){
        next(ApiError.badRequest(error.message))
    }
    next()
}

module.exports = validation