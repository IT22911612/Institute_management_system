const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({


    subject: {
        type: String,
        required : true
    },

    grade :{
        type : String,
        required : true
    },

    date: {
        type: String,
        required : true
    },

    start_time:{
        type : String,
        required : true
    },

    end_time:{
        type : String,
        required : true
    },

    location:{
        type : String,
        required : true
    },

});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
