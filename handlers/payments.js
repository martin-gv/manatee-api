const db = require("../models");
const { newest } = require("../helpers/helpers");

exports.createPayment = async function(req, res, next) {
   try {
      // const { orderID } = req.params;
      // const { payment } = req.body;
      // let data;

      // if (orderID) {
      //    data = { orderID, ...payment };
      // } else {
      //    data = payment;
      // }
      const data = req.body.payment;
      const op = await db.Payment.create(data);
      return res.status(200).json(op);
   } catch (err) {
      return next(err);
   }
};

exports.getPayment = async function(req, res, next) {
   try {
      const { orderID, search } = req.query;
      const query = search ? JSON.parse(search) : null; // is this neccesary?
      const criteria = orderID
         ? { orderID: +orderID }
         : query
            ? {
                 datePaid: {
                    $gte: new Date(query.from),
                    $lte: new Date(query.to)
                 }
              }
            : {};
      // const op = await db.Payment.find(criteria).sort({ datePaid: "desc" });
      const op = await db.Payment.aggregate([
         { $match: criteria },
         {
            $addFields: {
               actionDate: {
                  $cond: { if: "$void", then: "$voidDate", else: "$datePaid" }
               }
            }
         },
         { $sort: { actionDate: -1 } }
      ]);
      return res.status(200).json(op);
   } catch (err) {
      return next(err);
   }
};

exports.updatePayment = async function(req, res, next) {
   try {
      let { paymentID } = req.params;
      let { data } = req.body;
      let op = await db.Payment.findOneAndUpdate({ paymentID }, data, {
         new: true
      });
      return res.status(200).json(op);
   } catch (err) {
      return next(err);
   }
};

// exports.deletePayment = async function(req, res, next) {
//    try {
//       let op = await db.Payment.findByIdAndRemove(req.params.id);
//       return res.status(200).json(op);
//    } catch (err) {
//       next(err);
//    }
// };
