const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useCreateIndex: true,
  useNewUrlParser: true, // Corrected option name
  useUnifiedTopology: true,
  useFindAndModify: false
});

const connection = mongoose.connection;
connection.on("error", console.error.bind(console, "MongoDB connection error:"));
connection.once("open", () => {
  console.log("MongoDB connection success!");
});

// Importing scheduleRouter after mongoose connection setup
const scheduleRouter = require("./routes/schedule.js");
app.use("/schedule", scheduleRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});
