const db = require("../models");

exports.createClient = async function(req, res, next) {
   try {
      const { client, clientID, firstName, lastName, phone, email } = req.body;
      let data;
      if (clientID) data = { clientID, firstName, lastName, phone, email };
      if (client) data = client;
      const op = await db.Client.create(data);
      return res.status(200).json(op);
   } catch (err) {
      return next(err);
   }
};

exports.getClient = async function(req, res, next) {
   try {
      const clientID = req.params.clientID;
      let op = await db.Client.find({ clientID })
         .populate("tags")
         .populate("company");
      return res.status(200).json(op);
   } catch (err) {
      return next(err);
   }
};

exports.updateClient = async function(req, res, next) {
   try {
      const clientID = req.params.clientID;
      const data = req.body.client;
      let op = await db.Client.findOneAndUpdate({ clientID }, data, {
         new: true
      })
         .populate("tags")
         .populate("company");
      return res.status(200).json(op);
   } catch (err) {
      return next(err);
   }
};

exports.deleteClient = async function(req, res, next) {
   try {
      let client = await db.Client.findOne({ clientID: req.params.clientID });
      await client.remove();
      return res.status(200).json(client);
   } catch (err) {
      return next(err);
   }
};
