const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
   collectionName: {
      type: String,
      required: true,
      unique: true
   },
   seq: {
      type: Number,
      required: true,
      default: 0
   }
});

const Counter = mongoose.model("Counter", counterSchema);
module.exports = Counter;
