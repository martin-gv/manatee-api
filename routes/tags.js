const express = require("express");
const router = express.Router({ mergeParams: true });

const { createTag } = require("../handlers/tags");

router.route("/").post(createTag);

module.exports = router;
