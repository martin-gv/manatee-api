const express = require("express");
const router = express.Router({ mergeParams: true });

const { getPricingColumn, getPricingRow } = require("../handlers/pricing");

// Create row, get all order rows
router.route("/columns").get(getPricingColumn);

router.route("/rows").get(getPricingRow);

module.exports = router;
