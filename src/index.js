const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/route");
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb+srv://vinayrathore45:vinay123@cluster0.euhc6tm.mongodb.net/digitalAgricultureAppDB")
  .then(() => console.log("Connected with the Database..."))
  .catch((err) => console.log(err));

  app.use("/", route);


app.listen(5000, () => console.log("App running on Port " + 5000));