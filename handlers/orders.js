const db = require("../models");
const { getNextID, newest } = require("../helpers/helpers");

exports.createOrder = async function(req, res, next) {
   try {
      const { clientID } = req.params;
      const { companyID, orders } = req.body;
      var data;

      if (clientID) {
         // Create single order
         data = {
            // refactor to validate hook
            orderID: await getNextID("orders"),
            clientID,
            companyID
         };
      } else {
         // Create multiple orders
         const withID = orders.map(async el => {
            const orderID = await getNextID("orders");
            return { orderID, ...el };
         });
         data = await Promise.all(withID);
      }

      const op = await db.Order.create(data);
      return res.status(200).json(op);
   } catch (err) {
      return next(err);
   }
};

exports.getOrder = async function(req, res, next) {
   try {
      const { orderID, clientID, companyID } = req.params;
      const { search } = req.query;
      const query = search ? JSON.parse(search) : null;
      if (search) {
         console.log("from", query.from, typeof query.from);
         console.log("to", query.to, typeof query.to);
      }
      const criteria = orderID
         ? { orderID }
         : clientID
            ? { clientID }
            : companyID
               ? { companyID }
               : search
                  ? { createdAt: { $gte: query.from, $lte: query.to } }
                  : {};
      // criteria.void = { $not: true };
      const op = await db.Order.find(criteria).sort(newest);
      return res.status(200).json(op);
   } catch (err) {
      return next(err);
   }
};

exports.updateOrder = async function(req, res, next) {
   try {
      const { orderID } = req.params;
      const data = req.body.order;
      const op = await db.Order.findOneAndUpdate({ orderID }, data, {
         new: true
      });
      return res.status(200).json(op);
   } catch (err) {
      return next(err);
   }
};

exports.deleteOrder = async function(req, res, next) {
   try {
      const { orderID } = req.params;
      const op = await db.Order.findOneAndDelete({ orderID });
      return res.status(200).json(op);
   } catch (err) {
      return next(err);
   }
};
