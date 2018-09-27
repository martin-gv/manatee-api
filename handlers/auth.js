const db = require("../models");
const jwt = require("jsonwebtoken");

const authError = {
   status: 400,
   message: "Invalid username or password"
};

exports.login = async function(req, res, next) {
   try {
      // let { username, password } = req.body;
      let user = await db.User.findOne({
         username: req.body.username
      });
      let { id, username } = user;
      let isMatch = await user.comparePassword(req.body.password);
      if (isMatch) {
         let token = jwt.sign({ id, username }, process.env.SECRET_KEY);
         return res.status(200).json({ id, username, token });
      } else {
         return next(authError);
      }
   } catch (err) {
      return next(authError);
   }
};

exports.signup = async function(req, res, next) {
   try {
      const { user } = req.body;
      const data = user ? user : req.body;
      let op = await db.User.create(data);
      // let { id, username } = op;
      // let token = jwt.sign({ id, username }, process.env.SECRET_KEY);
      // return res.status(200).json({ id, username, token });
      return res.status(200).json(op);
   } catch (err) {
      // if validation fails
      if (err.code === 11000) {
         err.message = "Sorry, that username is taken";
      }
      return next({
         status: 400,
         message: err.message
      });

      // see what kind of error
      // if it is a certain error
      // respond with username/email already taken
      // otherwise send back a generic 400
   }
};
