const mongoose = require("mongoose");

const pricingRowSchema = new mongoose.Schema(
   {
      display: { type: String },
      category: { type: String },
      minCharge: { type: Number },
      pricing: [{ colNum: { type: Number }, price: { type: Number } }]
   },
   { timestamps: true }
);

const PricingRow = mongoose.model("PricingRow", pricingRowSchema);
module.exports = PricingRow;
