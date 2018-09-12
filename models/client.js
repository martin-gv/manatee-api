const mongoose = require("mongoose");
const db = require("../models");
const { generateSearch } = require("../helpers/helpers");

const clientSchema = new mongoose.Schema(
   {
      clientId: {
         type: String,
         required: true,
         unique: true
      },
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      firstName: { type: String },
      lastName: { type: String },
      phone: { type: String },
      email: { type: String },
      company: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Company"
      },
      framingRewards: [
         {
            cardNum: { type: Number },
            points: [
               {
                  pointNum: { type: Number },
                  orderID: { type: Number },
                  // rowID: { type: Number },
                  amount: { type: Number }
               }
            ],
            completed: { type: Boolean },
            creditEarned: { type: Number }
         }
      ],
      tags: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ClientTag",
            index: true
         }
      ],
      secureNotes: { type: String },
      search: {
         type: String,
         required: true,
         index: true
      }
   },
   { timestamps: true }
);

const fields = ["clientId", "firstName", "lastName", "phone", "email"];
const newSearchField = function(obj) {
   return generateSearch(obj, fields);
};

clientSchema.pre("validate", function(next) {
   this.isNew ? (this.search = newSearchField(this)) : null;
   next();
});

clientSchema.pre("findOneAndUpdate", function(next) {
   const { _update } = this;
   if (!_update.skipPreUpdateHook) {
      this.findOneAndUpdate({}, { search: newSearchField(_update) });
   }
   next();
});

clientSchema.post("findOneAndUpdate", async function(result, next) {
   try {
      let { companyUpdate } = this._update;
      let { _id, company } = result;

      if (companyUpdate) {
         if (company) {
            await db.Company.findByIdAndUpdate(company, {
               $push: { contacts: _id }
            });
         } else {
            await db.Company.findOneAndUpdate(
               { contacts: _id },
               { $pull: { contacts: _id } }
            );
         }
      }

      next();
   } catch (err) {
      next(err);
   }
});

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
