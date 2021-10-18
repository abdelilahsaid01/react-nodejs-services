const express = require("express");
const app = express();
const { data } = require("./utils/configdb");
var cors = require("cors");
require("dotenv").config();
const path = require('path');

// Imports
const auth = require("./routes/auth");
const user = require("./routes/user");
const product = require("./routes/product");
const category = require("./routes/category");
const mail = require("./routes/mail");

const { isAuth } = require("./middlewares/user");
// middleware
app.use(express.json());
app.use(cors());

app.use(express.static('public'));
app.use("*", express.static(__dirname +'/public/index.html'));


// db Config
data();

//Routes
app.use("/api/", auth);
app.use("/api/user", isAuth, user);
app.use("/api/category", isAuth, category);
app.use("/api/product", isAuth, product);
app.use("/api/mail", mail);
// Listener
const port = process.env.PORT || 4000;
app.listen(port, () => console.log("Server in lestening on : ", port));
