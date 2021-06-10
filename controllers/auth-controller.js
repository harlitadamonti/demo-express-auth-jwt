const bcrypt = require("bcrypt");
const ApiError = require("../helpers/api-error");
const saltRounds = 10;
const db = require("./../db/models");

const register = async (req, res, next) => {
  const user = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  try {
    const insertData = await db.User.create(user);
    insertData.password = undefined;
    res.status(201).json({
      success: true,
      message: "success register a user !",
      data: insertData,
    });
  } catch (error) {
    if (error.message === "Validation error") {
      const message = error.errors.map((e) => e.message).join(" ");
      const newError = ApiError.badRequest(message);
      next(newError);
    } else {
      const newError = ApiError.internal(
        "something went wrong when register a user !"
      );
      next(newError);
    }
  }
};

module.exports = {
  register,
};
