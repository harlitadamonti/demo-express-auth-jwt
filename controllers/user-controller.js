const db = require("./../db/models");

const profile = async (req, res, next) => {
    const { id } = req.user;
    const user = await db.User.findByPk(id);
    user.password = undefined;
    res.json({
        success: true,
        message: "success retrieve user profile",
        data: user,
    });
};

const list = async (req, res, next) => {
    const users = await db.User.findAll({
        attributes: {
            exclude: ["password"],
        },
    });
    res.json({
        success: true,
        message: "success retrieve all users data",
        data: users,
    });
};

module.exports = {
    profile,
    list,
};
