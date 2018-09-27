const mongoose = require("mongoose");

const clientTagSchema = new mongoose.Schema(
   {
      category: {
         type: String,
         required: true
      },
      name: {
         type: String,
         required: true
      }
   },
   { timestamps: true }
);

const ClientTag = mongoose.model("ClientTag", clientTagSchema);
module.exports = ClientTag;
