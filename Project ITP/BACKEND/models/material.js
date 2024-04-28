const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const materialSchema = new Schema({

    title :{
        type : String,
        required : true
    },

    student_id :{
        type : String,
        required : true
    },

    type:{
        type : Number,
        required : true
    },

    subject:{
        type : String,
        required : true
    },

    description:{
        type : String,
        required : true
    },

    upload_date: {
        type: Number,
        required : true
    },

});

const Material = mongoose.model("Material", materialSchema);

module.exports = Material;
