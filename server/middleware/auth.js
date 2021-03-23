const { User } = require("../models/User");

let auth = (req, res, next) => {
  /* [AUTHENTICATION PROCESS] */

  // Get the token from client's cookie
  let token = req.cookies.x_auth;
  // Decode token and find user
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    // If there is no user, authentication process fail
    if (!user) return res.json({ isAuth: true, error: true });

    // If user exists, authentication process success
    req.token = token;
    req.user = user;

    // To finish this middleware, adds next() method
    next();
  });
};

module.exports = { auth };
