const mongoose = require("mongoose");
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const urlDB = "mongodb+srv://huytra264:Huytra264@cluster1.2wruq.mongodb.net/cgvphake?retryWrites=true&w=majority"
mongoose.connect(urlDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log("Connection failed...");
  });

module.exports = { connection };