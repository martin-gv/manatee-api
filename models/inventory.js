const mongoose = require("mongoose");
const { getNextID } = require("../helpers/helpers");

const inventoryItemSchema = new mongoose.Schema(
   {
      inventoryID: {
         type: Number,
         required: true,
         unique: true
      },
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      title: { type: String },
      artist: { type: String },
      type: { type: String },
      medium: { type: String },
      price: { type: Number },
      searchFields: { type: String, required: true, index: true }
   },
   {
      timestamps: true
   }
);

const searchFields = ["inventoryID", "title", "artist"];

inventoryItemSchema.pre("validate", async function(next) {
   try {
      if (this.isNew) {
         this.inventoryID = await getNextID("inventory");
      }
      this.searchFields = (this.title + " " + this.artist).toLowerCase();
      return next();
   } catch (err) {
      return next(err);
   }
});

const InventoryItem = mongoose.model("InventoryItem", inventoryItemSchema);

module.exports = InventoryItem;
module.exports.searchFields = searchFields;
