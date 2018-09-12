const db = require("../models");

exports.createClient = async function(req, res, next) {
   try {
      const { client, clientId, firstName, lastName, phone, email } = req.body;
      let data;
      if (clientId) data = { clientId, firstName, lastName, phone, email };
      if (client) data = client;
      const op = await db.Client.create(data);
      return res.status(200).json(op);
   } catch (err) {
      return next(err);
   }
};

exports.getClient = async function(req, res, next) {
   try {
      const clientId = req.params.client_id;
      let op = await db.Client.find({ clientId })
         .populate("tags")
         .populate("company");
      return res.status(200).json(op);
   } catch (err) {
      return next(err);
   }
};

exports.updateClient = async function(req, res, next) {
   try {
      const clientId = req.params.client_id;
      const data = req.body.client;
      let op = await db.Client.findOneAndUpdate({ clientId }, data, {
         new: true
      });
      return res.status(200).json(op);
   } catch (err) {
      return next(err);
   }
};

exports.deleteClient = async function(req, res, next) {
   try {
      let client = await db.Client.findOne({ clientId: req.params.client_id });
      await client.remove();
      return res.status(200).json(client);
   } catch (err) {
      return next(err);
   }
};
