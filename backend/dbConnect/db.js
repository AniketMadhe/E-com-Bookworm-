const mongoose = require("mongoose");

const dbConnect = async () => {
  mongoose
    .connect(`${process.env.URL}`)
    .then(() => {
      console.log("Connected to database successfully!");
    })
    .catch((e) => {
      console.log(e);
    });
};

module.exports = dbConnect;
