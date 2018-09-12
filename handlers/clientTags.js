const db = require("../models");

exports.createClientTag = async function(req, res, next) {
   try {
      // .create() can accept a spread or array
      // let data = req.body.payment;
      // let op = await db.Payment.create(data);
      // return res.status(200).json(op);
   } catch (err) {
      return next(err);
   }
};

exports.getClientTag = async function(req, res, next) {
   try {
      let op = await db.ClientTag.find();
      return res.status(200).json(op);
   } catch (err) {
      return next(err);
   }
};

exports.updateClientTag = async function(req, res, next) {
   try {
      // let op = await db.Payment.findByIdAndUpdate(req.params.id, req.body.row);
      // return res.status(200).json(op);
   } catch (err) {
      return next(err);
   }
};

exports.deleteClientTag = async function(req, res, next) {
   try {
      // let op = await db.Payment.findByIdAndRemove(req.params.id);
      // return res.status(200).json(op);
   } catch (err) {
      next(err);
   }
};

