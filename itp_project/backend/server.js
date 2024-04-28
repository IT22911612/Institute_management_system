const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 8070;

//middleware
app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL , {    
});


const connection = mongoose.connection;
  

app.listen(PORT, ()=> {
    console.log(`listen to ${PORT}`)
});

connection.once("open", () => {
 console.log("Mongodb connection sucsussfull !");

});     

const studentRouter = require("./routes/students.js");
app.use("/student", studentRouter);

const incomeRouter = require("./routes/incomes.js");
app.use("/income" , incomeRouter);

const expenseRouter = require("./routes/expenses.js")
app.use("/expense" , expenseRouter); 