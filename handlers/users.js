const db = require("../models");

exports.createUser = async function(req, res, next) {
   try {
      // let data = req.body.tag;
      // await db.Tag.create(data);
      // // returns all tags, including new tag
      // let op = await db.Tag.find();
      // return res.status(200).json(op);
   } catch (err) {
      return next(err);
   }
};

exports.getUser = async function(req, res, next) {
   try {
      let op = await db.User.find();
      return res.status(200).json(op);
   } catch (err) {
      return next(err);
   }
};

exports.updateUser = async function(req, res, next) {
   try {
      // let op = await db.Payment.findByIdAndUpdate(req.params.id, req.body.row);
      // return res.status(200).json(op);
   } catch (err) {
      return next(err);
   }
};

exports.deleteUser = async function(req, res, next) {
   try {
      // let op = await db.Payment.findByIdAndRemove(req.params.id);
      // return res.status(200).json(op);
   } catch (err) {
      next(err);
   }
};
