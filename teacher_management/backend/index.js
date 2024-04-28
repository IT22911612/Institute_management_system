const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const teacherRoutes = require("./routes/teacherroutes");


const app=express()

app.use(cors())
app.use(express.json())
app.use("/", teacherRoutes);


const PORT=process.env.PORT||8020








mongoose.connect("mongodb+srv://Janith:Janith2002@cluster0.jz4uyh8.mongodb.net/student_db?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
  
    console.log(`port number => ${PORT}`)
    app.listen(PORT,()=>console.log("server connection successful"))
}).catch((err)=>{
    console.log(err)
})

