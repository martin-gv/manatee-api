const express = require("express");
const router = express.Router({ mergeParams: true });

const {
   createClient,
   getClient,
   updateClient,
   deleteClient
} = require("../handlers/clients");
const { getTag } = require("../handlers/tags");
const { getOrder, createOrder } = require("../handlers/orders");

router.route("/").post(createClient);

router.route("/tags").get(getTag);

router
   .route("/:clientID")
   .get(getClient)
   .put(updateClient)
   .delete(deleteClient);

// Client order routes
router
   .route("/:clientID/orders")
   .get(getOrder)
   .post(createOrder);

module.exports = router;
