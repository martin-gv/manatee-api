const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
   {
      orderID: {
         type: Number,
         required: true,
         unique: true
      },
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      clientID: { type: Number, required: true },
      companyID: { type: Number },
      title: { type: String },
      // rows: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderRow" }],
      total: { type: Number, required: true, default: 0 },
      paymentTotal: { type: Number, required: true, default: 0 },
      void: { type: Boolean },
      voidDate: { type: Date }
   },
   {
      timestamps: true
   }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
