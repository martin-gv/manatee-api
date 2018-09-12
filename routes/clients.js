const express = require("express");
const router = express.Router({ mergeParams: true });

const {
   createClient,
   getClient,
   updateClient,
   deleteClient
} = require("../handlers/clients");

const { getClientTag } = require("../handlers/clientTags");
const { getOrder, createOrder } = require("../handlers/orders");

router.route("/").post(createClient);

router.route("/tags").get(getClientTag);

router
   .route("/:client_id")
   .get(getClient)
   .put(updateClient)
   .delete(deleteClient);

// Client order routes
router
   .route("/:clientID/orders")
   .get(getOrder)
   .post(createOrder);

module.exports = router;
