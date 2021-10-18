const mongoose = require("mongoose");
require("dotenv").config();
exports.data = () => {
  mongoose
    .connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("you are connected..."))
    .catch((e) => console.log(e));
  //Get the default connection

  var db = mongoose.connection;
  //Bind connection to error event (to get notification of connection errors)
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
};
