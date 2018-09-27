const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   firstName: { type: String },
   lastName: { type: String },
   email: { type: String }
});

// Hash password if it's new or modified
userSchema.pre("save", async function(next) {
   try {
      if (!this.isModified("password")) return next();
      let hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
      return next();
   } catch (err) {
      return next(err);
   }
});

// Helper function to check for correct password
userSchema.methods.comparePassword = async function(input, next) {
   try {
      let isMatch = await bcrypt.compare(input, this.password);
      return isMatch;
   } catch (err) {
      return next(err);
   }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
