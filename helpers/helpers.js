const db = require("../models");

exports.getNextID = async function(collectionName) {
   try {
      let counter = await db.Counter.findOneAndUpdate(
         { collectionName },
         { $inc: { seq: 1 } },
         { upsert: true, new: true }
      );
      return counter.seq;
   } catch (err) {
      throw err;
   }
};

// refactor so .trim() is not needed? perhaps with reduce method?
exports.generateSearch = function(obj, fields) {
   return fields
      .reduce((acc, current) => {
         return `${acc} ${obj[current]}`;
      }, "")
      .toLowerCase()
      .trim();
};

exports.generateQuery = function(string) {
   const terms = string.split(/\s+/);
   const query = terms.map(t => ({
      search: new RegExp(t)
   }));
   return query;
};

exports.newest = { createdAt: "desc" };

exports.chunk = function(arr, len) {
   var chunks = [],
      i = 0,
      n = arr.length;
   while (i < n) {
      chunks.push(arr.slice(i, (i += len)));
   }
   return chunks;
};

