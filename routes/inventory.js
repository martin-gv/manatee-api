const express = require("express");
const router = express.Router({ mergeParams: true });

const {
   createInventoryItem,
   getInventoryItem,
   updateInventoryItem,
   deleteInventoryItem,
   printInventoryItem
} = require("../handlers/inventory");

// Create and get inventory items
router
   .route("/")
   .post(createInventoryItem)
   .get(getInventoryItem);

router.route("/print").post(printInventoryItem);

// Single Item: Get, Update, Delete
router
   .route("/:inventoryID")
   .get(getInventoryItem)
   .put(updateInventoryItem)
   .delete(deleteInventoryItem);

module.exports = router;
