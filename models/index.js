const mongoose = require("mongoose");

mongoose.set("debug", true); // useful to see mongo queries in terminal
mongoose.Promise = Promise;
mongoose.connect(
   process.env.MONGODB_URI || "mongodb://localhost/koala",
   { keepAlive: true }
);

module.exports.Counter = require("./counter");
module.exports.User = require("./user");
module.exports.Client = require("./client");
module.exports.ClientTag = require("./clientTag");
// does order of models matter for populate?
// test by moving company above client and seeing if app still works
module.exports.Company = require("./companies");
module.exports.Order = require("./order");
module.exports.OrderRow = require("./orderRow");
module.exports.Payment = require("./payment");
module.exports.InventoryItem = require("./inventory");
module.exports.PricingRow = require("./pricingRow");
module.exports.PricingColumn = require("./pricingColumn");
