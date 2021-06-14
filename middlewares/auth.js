const { JsonWebTokenError, TokenExpiredError } = require("jsonwebtoken");
const ApiError = require("../helpers/api-error");
const { verify } = require("../helpers/auth-jwt");

const authentication = (req, res, next) => {
    try {
        const headerToken = req.headers.authorization;
        if (headerToken) {
            const token = headerToken.split(" ")[1];
            const payload = verify(token);
            req.user = payload;
            return next();
        }
        throw ApiError.badRequest("token required !");
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return next(ApiError.unauthorized("token expired !"));
        } else if (error instanceof JsonWebTokenError) {
            return next(ApiError.unauthorized("token invalid !"));
        } else {
            return next(error);
        }
    }
};

const authorization =
    (...roles) =>
    (req, res, next) => {
        if (roles.includes(req.user.role)) {
            return next();
        } else {
            return next(ApiError.forbidden("forbidden !"));
        }
    };

module.exports = {
    authentication,
    authorization,
};
