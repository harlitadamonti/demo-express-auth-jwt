const ApiError = require("../helpers/api-error");

const validation = (schema) => (req, res, next) => {
    const { value, error } = schema.validate(req.body);
    if (error) {
        return next(ApiError.badRequest(error.message));
    }
    return next();
};

module.exports = validation;
