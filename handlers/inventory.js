const db = require("../models");
const createReport = require("docx-templates");
const { generateSearch, chunk } = require("../helpers/helpers");

exports.createInventoryItem = async function(req, res, next) {
   try {
      const inventoryItem = await db.InventoryItem.create(req.body.inventory);
      return res.status(200).json(inventoryItem);
   } catch (err) {
      return next(err);
   }
};

exports.getInventoryItem = async function(req, res, next) {
   try {
      const search = req.query.search;
      const { inventoryID } = req.params;

      if (search) {
         const terms = search.toLowerCase().split(/\s+/);
         const criteria = terms.map(t => ({
            searchFields: new RegExp(t)
         }));
         let query = await db.InventoryItem.find({ $and: criteria }).limit(15);
         return res.status(200).json(query);
      } else if (inventoryID) {
         let op = await db.InventoryItem.find({ inventoryID });
         return res.status(200).json(op);
      } else {
         let query = await db.InventoryItem.find()
            .sort({ inventoryID: "desc" })
            .limit(15);
         return res.status(200).json(query);
      }
   } catch (err) {
      return next(err);
   }
};

exports.updateInventoryItem = async function(req, res, next) {
   try {
      const item = req.body.inventory;

      // refactor this to a middleware hook
      const searchFields = generateSearch(item, db.InventoryItem.searchFields);

      let updatedItem = await db.InventoryItem.findOneAndUpdate(
         { inventoryID: req.params.inventoryID },
         { ...item, searchFields },
         { new: true }
      );
      return res.status(200).json(updatedItem);
   } catch (err) {
      return next(err);
   }
};

exports.deleteInventoryItem = async function(req, res, next) {
   try {
      let deletedItem = await db.InventoryItem.findOneAndDelete({
         inventoryID: req.params.inventoryID
      });
      return res.status(200).json(deletedItem);
   } catch (err) {
      return next(err);
   }
};

exports.printInventoryItem = async function(req, res, next) {
   try {
      const inventory = JSON.parse(req.body.inventory);
      const printData = chunk(inventory, 2);
      await createReport({
         template: "templates/priceTags.docx",
         output: "output/priceTags.docx",
         data: { inventory: printData }
      });
      return res
         .status(200)
         .download(
            "./output/priceTags.docx",
            "Price Tags - " + new Date() + ".docx"
         );
   } catch (err) {
      return next(err);
   }
};
