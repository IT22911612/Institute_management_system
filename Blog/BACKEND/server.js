const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();
const studentRouter = require('./routes/student.js');

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL =  process.env.MONGODB_URL;

mongoose.connect(URL,{
    useNewUrlParser:true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open",() => {
    console.log("Mongodb Connection success");
});

conststudentRouter = require("./routes/student.js");



app.use("/student",studentRouter);

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});

app.get("/",(req,res) => {
    res.send("Hello from node API you ass hole");
});