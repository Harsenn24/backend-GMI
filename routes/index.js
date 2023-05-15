const express = require("express");
const { User } = require("../controller");
const { authentif } = require("../middleware/authguard");
const router = express.Router();

router.post("/register", User.register);
router.post("/login", User.login);

router.use(authentif);

router.get("/user", User.get_user);

module.exports = { router };
