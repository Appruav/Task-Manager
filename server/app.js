const express = require("express");

const app = express();
app.set("views", "views");
app.set("view engine", "ejs");
const { connect } = require("./config/db-connect");
const cors = require("cors");
require("dotenv").config();
// const ejs = require("ejs");

const { Router } = require("./routes/routes");
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use("/api", Router);
const PORT=process.env.PORT || 9000;
const start = () => {
  const url = process.env.MONGOURL|| process.env.url;
  connect(url);
  app.listen(PORT, () => {
    console.log(url);
    console.log("Consoled");
  });
};
start();
