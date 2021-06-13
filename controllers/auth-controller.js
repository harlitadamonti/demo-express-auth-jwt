const bcrypt = require("bcrypt");
const ApiError = require("../helpers/api-error");
const authJwt = require("../helpers/auth-jwt");
const saltRounds = 10;
const db = require("./../db/models");

const register = async (req, res, next) => {
    try {
        const user = req.body;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
        const insertData = await db.User.create(user);
        insertData.password = undefined;
        res.status(201).json({
            success: true,
            message: "success register a user !",
            data: insertData,
        });
    } catch (error) {
        if (error.message === "Validation error") {
            next(ApiError.badRequest("email or username has been used !"));
        } else {
            next(error);
        }
    }
};

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await db.User.findOne({
            where: {
                username,
            },
        });
        if (user) {
            const isPassword = bcrypt.compareSync(password, user.password);
            user.password = undefined;
            if (isPassword) {
                const payload = {
                    username: user.username,
                    id: user.id,
                    email: user.email,
                    role: user.role
                };
                const token = authJwt.generate(payload);
                return res.json({
                    success: true,
                    message: "success login",
                    data: {user, token},
                });
            }
        }
        throw ApiError.badRequest("username or password doesn't match !");
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = {
    register,
    login,
};
