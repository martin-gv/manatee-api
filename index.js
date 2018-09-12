require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const db = require("./models");

const errorHandler = require("./handlers/errors");
const { generateQuery } = require("./helpers/helpers");
const { loginRequired } = require("./middleware/auth");

const authRoutes = require("./routes/auth");
const clientRoutes = require("./routes/clients");
const companyRoutes = require("./routes/companies");
const orderRoutes = require("./routes/orders");
const orderRowRoutes = require("./routes/orderRows");
const paymentRoutes = require("./routes/payments");
const inventoryRoutes = require("./routes/inventory");
const pricingRoutes = require("./routes/pricing");

const PORT = process.event.PORT || 8081;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));

// all routes here
app.use("/api/auth", authRoutes);
app.use("/api/clients", loginRequired, clientRoutes);
app.use("/api/companies", loginRequired, companyRoutes);
app.use("/api/orders", loginRequired, orderRoutes);
app.use("/api/order_rows", loginRequired, orderRowRoutes);
app.use("/api/payments", loginRequired, paymentRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/pricing", loginRequired, pricingRoutes);

app.get("/api/clients", loginRequired, async function(req, res, next) {
   try {
      const { search, tagSearch } = req.query;
      if (search) {
         // accepts a single string containing all search terms
         let op = await db.Client.find({ $and: generateQuery(search) })
            .sort({ createdAt: "desc" })
            .limit(25);
         return res.status(200).json(op);
      } else if (tagSearch) {
         // accepts array of clientTag ids
         console.log("tagSearch", tagSearch);
         let op = await db.Client.find({ tags: { $all: tagSearch } })
            .sort({ createdAt: "desc" })
            .limit(25);
         return res.status(200).json(op);
      } else {
         // returns all clients
         let op = await db.Client.find()
            .sort({ createdAt: "desc" })
            .limit(25);
         return res.status(200).json(op);
      }
   } catch (err) {
      return next(err);
   }
});

// if none of routes are reached then run a function
// next allows us to move to next piece of middleware

app.use(function(req, res, next) {
   let err = new Error("Not Found");
   err.status = 404;
   next(err);
});

app.use(errorHandler);

app.listen(PORT, function() {
   console.log(`Server is starting on port ${PORT}`);
});
