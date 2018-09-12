const db = require("../models");

exports.createOrderRow = async function(req, res, next) {
   try {
      const data = req.body.row;
      const op = await db.OrderRow.create(data);
      return res.status(200).json(op);
   } catch (err) {
      return next(err);
   }
};

exports.getOrderRow = async function(req, res, next) {
   try {
      const { orderID } = req.query;
      // let op = await db.OrderRow.find({ orderID }).populate("inventoryItem");
      // testing using $lookup so search on joined documents is possible in future

      let op = await db.OrderRow.aggregate([
         { $match: { orderID: +orderID } },
         {
            $lookup: {
               from: db.InventoryItem.collection.name,
               localField: "inventoryItem",
               foreignField: "_id",
               as: "inventoryItem"
            }
         },
         {
            $unwind: {
               path: "$inventoryItem",
               preserveNullAndEmptyArrays: true
            }
         },
         {
            $addFields: {
               itemPrice: "$inventoryItem.price"
            }
         },
         { $sort: { rowNum: 1 } }
      ]);

      return res.status(200).json(op);
   } catch (err) {
      return next(err);
   }
};

exports.updateOrderRow = async function(req, res, next) {
   try {
      let op = await db.OrderRow.findByIdAndUpdate(
         req.params.id,
         req.body.row,
         { new: true }
      );
      return res.status(200).json(op);
   } catch (err) {
      return next(err);
   }
};

exports.deleteOrderRow = async function(req, res, next) {
   try {
      let op = await db.OrderRow.findByIdAndRemove(req.params.id);
      return res.status(200).json(op);
   } catch (err) {
      next(err);
   }
};
