const express=require("express")
const studentmodel = require("../models/studentmodel");
const router = express.Router();




router.get("/_student",async(req,res)=>{
    const data= await studentmodel.find({})
  
    res.json({success:true,data:data})
})


router.post("/create_student",async(req,res)=>{
    const data=new studentmodel(req.body)
    await data.save()
    res.send({success:true,message:"data created successfuly"})
})


router.put("/update_student",async(req,res)=>{
    const {id,...rest}=req.body
    const data=await studentmodel.updateOne({_id:id},rest)
    res.send({success:true,message:"updated successfuly",data:data})
})




router.delete("/delete_student/:id",async(req,res)=>{
const id=req.params.id
const data=await studentmodel.deleteOne({_id:id})
res.send({success:true,message:"deleted successfully",data:data})
})




router.get("/count_student",async(req,res)=>{
    try{
        const users=await studentmodel.find({});

        return res.status(200).json({
            count:users.length,
            data:users
        })

    }catch(err){
            console.log(err.message);
            res.json({success:true,message:"Order count successfully",data:data})
    }

})

router.get("/order_student/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const order = await studentmodel.findById(id);

        if (!order) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        res.send({ success: true, message: "User fetched successfully", data: order });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});

router.post("/login_user", async (req, res) => {
    const { s_email, s_password } = req.body;
  
    try {
        const user = await studentmodel.findOne({ s_email });
      
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
    
        const isPasswordValid = user.s_password === s_password;

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }
  
        // If password is valid, send success message and user data
        res.status(200).json({ success: true, message: "Login successful", data: user });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: error });
    }
});

router.get("/student_profile", (req, res) => {
    // Check if user is authenticated
    if (req.isAuthenticated()) {
        // Assuming you're storing user information in the session
        const { userId } = req.session.passport.user;

        // Query the database for student details using userId
        studentmodel.findById(userId, (err, student) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                if (student) {
                    // If student found, send the details
                    res.json(student);
                } else {
                    // If student not found
                    res.status(404).json({ error: 'Student not found' });
                }
            }
        });
    } else {
        // If user is not authenticated
        res.status(401).json({ error: 'Unauthorized' });
    }
});

module.exports = router;