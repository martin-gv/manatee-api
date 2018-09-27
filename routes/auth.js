const express = require("express");
const router = express.Router();

const { loginRequired } = require("../middleware/auth");
const { signup, login } = require("../handlers/auth");

router.post("/signup", loginRequired, signup);
router.post("/login", login);

module.exports = router;
