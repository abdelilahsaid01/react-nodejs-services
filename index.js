const express = require("express");
const app = express();
const { data } = require("./utils/configdb");
var cors = require("cors");
require("dotenv").config();

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

// db Config
data();

//Routes
app.use("/", auth);
app.use("/user", isAuth, user);
app.use("/category", isAuth, category);
app.use("/product", isAuth, product);
app.use("/mail", mail);

// Listener
const port = process.env.PORT || 4000;
app.listen(port, () => console.log("Server in lestening on : ", port));
