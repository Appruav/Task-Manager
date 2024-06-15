const mongoose = require("mongoose");

const connect = async (url) => {
  await mongoose
    .connect(url)
    .then(() => {
      console.log("Db Connection Sucessfully");
    })
    .catch((err) => {
      console.log("Error while connecting to database", err);
    });
};
module.exports = { connect };
