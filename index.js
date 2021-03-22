// Get the express module
const express = require("express");
// Create Express APP
const app = express();
// Set the port for back-end server
const port = 5000;
// Connet Mongoose
const mongoose = require("mongoose");
// Get the body-parser module
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/key");

//Application/x--www-form-urlencded
app.use(bodyParser.urlencoded({ extended: true }));
//Application/josn
app.use(bodyParser.json());

// Get the Models
const { User } = require("./models/User");

mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", (req, res) => {
  const user = new User(req.body);

  // Before save userSchema, pre() meddleware function is executed.
  user.save((err, userInfo) => {
    // send a response
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post("/login", (req, res) => {
  // Find a requested email in our DB
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "The email does not exists 🚨",
      });
    }
    // If exists, compare password (comparePassword method saved in User model)
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        res.json({
          loginSuccess: false,
          message: "Password does not match 🚨",
        });
      } else {
        // If email and password correct, generate token
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);

          // Save token into a local storage or Cookie. In this web-application, we save it into cookie by cookie-parser. Naming it as a "x_auth"
          res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
        });

        res.json({
          loginSuccess: true,
        });
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
