const express = require("express");
const router = express.Router({ mergeParams: true });

const { getUser } = require("../handlers/users");

router.route("/").get(getUser);

module.exports = router;
