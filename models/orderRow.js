const mongoose = require("mongoose");

const orderRowSchema = new mongoose.Schema(
   {
      orderID: { type: Number, required: true },
      rowNum: { type: Number, required: true },
      quantity: { type: String, required: true, default: 1 },
      title: { type: String },
      price: { type: Number },
      height: { type: String },
      width: { type: String },
      glass: { type: String },
      mount: { type: String },
      framingRewards: { type: Boolean },
      inventoryItem: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "InventoryItem"
      },
      void: { type: Boolean },
      voidDate: { type: Date }
   },
   { timestamps: true }
);

orderRowSchema.index({ orderID: 1, rowNum: 1 }, { unique: true });
orderRowSchema.index(
   { inventoryItem: 1 },
   {
      unique: true,
      partialFilterExpression: {
         inventoryItem: { $type: "objectId" }
      }
   }
);

const orderRow = mongoose.model("orderRow", orderRowSchema);
module.exports = orderRow;
