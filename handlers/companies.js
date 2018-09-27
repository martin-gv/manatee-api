const db = require("../models");
const { newest } = require("../helpers/helpers");

exports.createCompany = async function(req, res, next) {
   try {
      let data = req.body.company;
      let op = await db.Company.create(data);
      return res.status(200).json(op);
   } catch (err) {
      return next(err);
   }
};

exports.getCompany = async function(req, res, next) {
   try {
      let { companyID } = req.query;
      let criteria = companyID ? { companyID } : {};
      let op = await db.Company.find(criteria) // .find() returns array
         .limit(25)
         .populate("primaryContact")
         .populate("contacts")
         .sort({ companyID: "desc" });
      return res.status(200).json(op);
   } catch (err) {
      return next(err);
   }
};

exports.updateCompany = async function(req, res, next) {
   try {
      let { companyID } = req.params;
      let data = req.body.company;
      let op = await db.Company.findOneAndUpdate({ companyID }, data, {
         new: true
      });
      return res.status(200).json(op);
   } catch (err) {
      return next(err);
   }
};

exports.deleteCompany = async function(req, res, next) {
   try {
      // let op = await db.Payment.findByIdAndRemove(req.params.id);
      // return res.status(200).json(op);
   } catch (err) {
      next(err);
   }
};
