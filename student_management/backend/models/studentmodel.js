const mongoose = require("mongoose");

const teacherschema = mongoose.Schema({
    s_name: String,
    s_age: String,
    s_gender: String,
    s_email: String,
    s_phone: String,
    s_address: String,
    s_grade: String,
    s_password: String,
}, {
    timestamps: true
});

const studentmodel = mongoose.model("students", teacherschema);

module.exports = studentmodel;
