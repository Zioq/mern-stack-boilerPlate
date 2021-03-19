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

const config = require("./config/key");

//Application/x--www-form-urlencded
app.use(bodyParser.urlencoded({extended:true}));
//Application/josn
app.use(bodyParser.json());

// Get the Models
const { User } =require("./models/User");


mongoose.connect(
    config.MONGO_URI,
    {
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

app.post("/register", (req,res) => {

    const user = new User(req.body);

    user.save((err,userInfo) => {
        
        // send a response
        if (err) return res.json({success:false, err});
        return res.status(200).json({
            success:true,
        })
    })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
