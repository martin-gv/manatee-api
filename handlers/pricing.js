const db = require("../models");

exports.getPricingColumn = async function(req, res, next) {
   try {
      let op = await db.PricingColumn.find();
      return res.status(200).json(op);
   } catch (err) {
      return next(err);
   }
};

exports.getPricingRow = async function(req, res, next) {
   try {
      let op = await db.PricingRow.find();
      return res.status(200).json(op);
   } catch (err) {
      return next(err);
   }
};
