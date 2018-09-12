const express = require("express");
const router = express.Router({ mergeParams: true });

const {
   createCompany,
   getCompany,
   updateCompany
} = require("../handlers/companies");
const { getOrder } = require("../handlers/orders");

// Companies: Create & Get
router
   .route("/")
   .post(createCompany)
   .get(getCompany);

// Single Company: Update
router.route("/:companyID").put(updateCompany);
// .delete(deleteOrderRow);

// Company Orders: Get
router.route("/:companyID/orders").get(getOrder);

module.exports = router;
