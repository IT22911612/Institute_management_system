const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const blogRoutes = require("./routes/blogroutes");


const app=express()

app.use(cors())
app.use(express.json())
app.use("/", blogRoutes);


const PORT=process.env.PORT||8020








mongoose.connect("mongodb+srv://shehan:Shehan99@cluster0.t3v3psz.mongodb.net/Orders?retryWrites=true&w=majority")
.then(()=>{
  
    console.log(`port number => ${PORT}`)
    app.listen(PORT,()=>console.log("server connection successful"))
}).catch((err)=>{
    console.log(err)
})

