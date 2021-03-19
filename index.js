// Get the express module
const express = require("express");
// Create Express APP
const app = express();
// Set the port for back-end server
const port = 5000;
// Connet Mongoose
const mongoose = require("mongoose");

mongoose.connect(
    "mongodb+srv://RobertHan:1q2w3e!!@react-blog.jsloa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
