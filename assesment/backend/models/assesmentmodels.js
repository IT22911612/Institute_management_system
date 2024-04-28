const mongoose=require("mongoose")
const assesmentschema=mongoose.Schema({
    subject:String,
    grade:String,
    topic:String,
    link:String,
    mark:String,
 
     
 
   

},{
    timestamps:true

})

const assesmentmodel=mongoose.model("assesments",assesmentschema)

module.exports = assesmentmodel;
