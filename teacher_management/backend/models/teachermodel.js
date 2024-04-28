const mongoose=require("mongoose")
const teacherschema=mongoose.Schema({
    t_name:String,
    t_email:String,
    t_phone:String,
    t_password:String,
    t_id:String,
    t_gender:String,
    t_address:String,
    t_subject:String,
    t_qualification:String,
     
 
   

},{
    timestamps:true

})

const teachermodel=mongoose.model("teachers",teacherschema)

module.exports = teachermodel;
