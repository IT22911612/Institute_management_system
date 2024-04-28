const express=require("express")


const teachermodel = require("../models/teachermodel");

const router = express.Router();


router.get("/_teacher",async(req,res)=>{
    const data= await teachermodel.find({})
  
    res.json({success:true,data:data})
})


router.post("/create_teacher",async(req,res)=>{
    const data=new teachermodel(req.body)
    await data.save()
    res.send({success:true,message:"data created successfuly"})
})


router.put("/update_teacher",async(req,res)=>{
    const {id,...rest}=req.body
    const data=await teachermodel.updateOne({_id:id},rest)
    res.send({success:true,message:"updated successfuly",data:data})
})




router.delete("/delete_teacher/:id",async(req,res)=>{
const id=req.params.id
const data=await teachermodel.deleteOne({_id:id})
res.send({success:true,message:"deleted successfully",data:data})
})




router.get("/count_teacher",async(req,res)=>{
    try{
        const users=await teachermodel.find({});

        return res.status(200).json({
            count:users.length,
            data:users
        })

    }catch(err){
            console.log(err.message);
            res.json({success:true,message:"Order count successfully",data:data})
    }

})

router.get("/order_teacher/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const order = await teachermodel.findById(id);

        if (!order) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        res.send({ success: true, message: "User fetched successfully", data: order });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});



module.exports = router;