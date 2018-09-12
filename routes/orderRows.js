const express = require("express");
const router = express.Router({ mergeParams: true });

const {
   createOrderRow,
   getOrderRow,
   updateOrderRow,
   deleteOrderRow
} = require("../handlers/orderRows");

// Create row, get all order rows
router
   .route("/")
   .post(createOrderRow)
   .get(getOrderRow);

// Update and delete row
router
   .route("/:id")
   .put(updateOrderRow)
   .delete(deleteOrderRow);

module.exports = router;
