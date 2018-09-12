const mongoose = require("mongoose");
const { getNextID } = require("../helpers/helpers");

const paymentSchema = new mongoose.Schema(
   {
      paymentID: { type: Number, required: true },
      orderID: { type: Number, required: true },
      paymentNum: { type: Number, required: true },
      amountPaid: { type: Number },
      datePaid: { type: Date },
      // paymentMethod: { type: String },
      amountRequired: { type: Number },
      dateRequired: { type: Date },
      void: { type: Boolean },
      voidDate: { type: Date }
   },
   { timestamps: true }
);

paymentSchema.index({ orderID: 1, paymentNum: 1 }, { unique: true });

paymentSchema.pre("validate", async function(next) {
   try {
      this.isNew && (this.paymentID = await getNextID("payments"));
      next();
   } catch (err) {
      next(err);
   }
});

const payment = mongoose.model("payment", paymentSchema);
module.exports = payment;
