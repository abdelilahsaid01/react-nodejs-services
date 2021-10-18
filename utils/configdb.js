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


// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://root:<password>@cluster0.lkgei.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });