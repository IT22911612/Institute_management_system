const express = require ("express");
const mongoose =  require ("mongoose");
const bodyParser = require("body-parser");
const cors = require ("cors");
const dotenv = require("dotenv");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useCreateIndex: true,
   useNewUrlPaser : true,
   useUnifiedTopology: true,
   useFindAndModify: false
});

const connection =  mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb connection success!");
})

app.listen(PORT, () => {
    console.log(`Server is up and running on port number : ${PORT}`);
})

const serviceRouter = require("../BACKEND/routes/services");
app.use("/services", serviceRouter);

const patientRouter = require("../BACKEND/routes/patients");
app.use("/patients", patientRouter);