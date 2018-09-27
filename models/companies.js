const mongoose = require("mongoose");
const { getNextID } = require("../helpers/helpers");

const companySchema = new mongoose.Schema(
   {
      companyID: {
         type: Number,
         required: true,
         unique: true
      },
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      name: { type: String },
      address: { type: String },
      city: { type: String },
      province: { type: String },
      country: { type: String },
      postalCode: { type: String },
      primaryContact: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Client"
      },
      contacts: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client"
         }
      ]
   },
   { timestamps: true }
);

companySchema.pre("validate", async function(next) {
   if (this.isNew) {
      this.companyID = await getNextID("company");
   }
   next();
});

const Company = mongoose.model("Company", companySchema);
module.exports = Company;
