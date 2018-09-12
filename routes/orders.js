const express = require("express");
const router = express.Router({ mergeParams: true });

const {
   createOrder,
   getOrder,
   updateOrder,
   deleteOrder
} = require("../handlers/orders");
const { createOrderRow, getOrderRow } = require("../handlers/orderRows");

// Get
router
   .route("/")
   .post(createOrder)
   .get(getOrder);

// Single Order: Get, Update, and Delete
router
   .route("/:orderID")
   .get(getOrder)
   .put(updateOrder)
   .delete(deleteOrder);

// Rows: Create and Get
router
   .route("/:order_id/rows")
   .post(createOrderRow)
   .get(getOrderRow);

module.exports = router;
