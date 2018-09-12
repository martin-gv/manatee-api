const express = require("express");
const router = express.Router({ mergeParams: true });

const {
   createPayment,
   getPayment,
   updatePayment
   // deletePayment
} = require("../handlers/payments");

// Create and Get
router
   .route("/")
   .post(createPayment)
   .get(getPayment);

// Update
router.route("/:paymentID").put(updatePayment);
// .delete(deletePayment);

module.exports = router;
