const ApiError = require("../helpers/api-error");

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.status).json({
      success: false,
      message: err.message,
    });
  } else {
    res.status(500).json({
      success: false,
      message: "something went wrong !",
    });
  }
};

module.exports = { errorHandler };
