const express=require("express")


const assesmentmodel = require("../models/assesmentmodels");

const router = express.Router();


router.get("/_assessmemnt",async(req,res)=>{
    const data= await assesmentmodel.find({})
  
    res.json({success:true,data:data})
})


router.post("/create_assessmemnt",async(req,res)=>{
    const data=new assesmentmodel(req.body)
    await data.save()
    res.send({success:true,message:"data created successfuly"})
})


router.put("/update_assessmemnt",async(req,res)=>{
    const {id,...rest}=req.body
    const data=await assesmentmodel.updateOne({_id:id},rest)
    res.send({success:true,message:"updated successfuly",data:data})
})




router.delete("/delete_assessmemnt/:id",async(req,res)=>{
const id=req.params.id
const data=await assesmentmodel.deleteOne({_id:id})
res.send({success:true,message:"deleted successfully",data:data})
})




router.get("/count_assessmemnt",async(req,res)=>{
    try{
        const users=await assesmentmodel.find({});

        return res.status(200).json({
            count:users.length,
            data:users
        })

    }catch(err){
            console.log(err.message);
            res.json({success:true,message:"Order count successfully",data:data})
    }

})

router.get("/order_assessmemnt/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const order = await assesmentmodel.findById(id);

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