const mongoose =  require("mongoose");

const Schema = mongoose.Schema;
const StudentSchema = new Schema({

    name: {
        type : String,
        required: true,
    },
    age: {
        type : Number,
        required: true,
    },
    address: {
        type : String,
        required: true,
    }
}) 

const Student = mongoose.model("Student" , StudentSchema )   //table name , schema name

module.exports = Student;