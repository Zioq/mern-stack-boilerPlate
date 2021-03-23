const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
var jwt = require("jsonwebtoken");

// Create user's schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlenght: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    minlenght: 5,
  },
  lastname: {
    type: String,
    maxlenght: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  //Manage validation using a token
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  var user = this;

  // only when password be set / updated.
  if (user.isModified("password")) {
    //Encrypt password before save this userSchema.
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        // Set the plain password with a hashed password.
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

//Methods
userSchema.methods.comparePassword = (plainPassword, cb) =>{
  bcrypt.compare(plainPassword, this.password, (err, isMatch) =>{
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this;
  // Create a token
  var token = jwt.sign(user._id.toHexString(), "secretToken");
  // Assign generated token into UserSchema's token property
  user.token = token;
  // Save the userSchema and callback the data.
  user.save((err,user) =>{
      if(err) return cb(err);
      cb(null, user);
  });
};

userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    // Decode a token
    jwt.verify(token, 'secretToken', function(err,decoded) {
        // Find a user using a USER.ID
        // compare the token which comes from client with the token which saved in DB
        user.findOne({"_id": decoded, "token": token}, function(err, user) {
            if(err) return cb(err);
            cb(null, user);
        })
        

    })

}

// Wrap the userSchema with a Model
const User = mongoose.model("User", userSchema);

// Export this Model
module.exports = { User };
