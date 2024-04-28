const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const assesmentRoutes = require("./routes/assesmentroutes");


const app=express()

app.use(cors())
app.use(express.json())
app.use("/", assesmentRoutes);


const PORT=process.env.PORT||8020








mongoose.connect("mongodb+srv://ridmisamarathunga2000:ridme123@merncluster.mmlmxej.mongodb.net/?retryWrites=true&w=majority&appName=mernCluster")
.then(()=>{
  
    console.log(`port number => ${PORT}`)
    app.listen(PORT,()=>console.log("server connection successful"))
}).catch((err)=>{
    console.log(err)
})

