const router = require("express").Router();
const schema = require("../helpers/validation-schema");
const validation = require("../middlewares/validation");
const authController = require("./../controllers/auth-controller");

router.post("/register", authController.register);
router.post("/login", validation(schema.login), authController.login);

module.exports = router;
