const mongoose = require("mongoose");

const pricingColumnSchema = new mongoose.Schema(
   {
      colNum: { type: Number, unique: true },
      maxSize: { type: Number }
   },
   { timestamps: true }
);

const PricingColumn = mongoose.model("PricingColumn", pricingColumnSchema);
module.exports = PricingColumn;
