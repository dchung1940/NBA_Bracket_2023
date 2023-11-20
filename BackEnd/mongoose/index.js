const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/playoffs")
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => console.log(err));
