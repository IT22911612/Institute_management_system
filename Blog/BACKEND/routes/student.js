const router = require("express").Router();
let Student = require("../models/Student");



router.route("/add").post((req,res)=>{

    const name = req.body.name;
    const age = req.body.age;
    const gender = req.body.gender;

    const newStudent = new Student({
        name,
        age,
        gender,
    })

    newStudent.save().then(()=>{
        res.jason("Student Added")
    }).catch((err)=>{
        console.log(err);
    })
})



router.route("/").get((req,res)=>{

    Student.find().then((Student)=>{
        res.json(Student)
    }).catch((err)=>{
        console.log(err)
    })
})



router.route("/update/:id").put(async (req, res)=>{
    let userId = req.params.id;
    const {name,age,gender} = req.body;

    const updatesStudents = {
        name,
        age, 
        gender,
    }

    const update = await Student.findByAndUpdate(userId, updateStudent).then(()=>{
        res.status(200).send({status: "User updated",user: update}) 
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Errorwith updating data"});
    })
})


router.route("/delete/:id").delete(async (req,res) =>{
    let userId = req. params.id;

    await Student.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "User deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete user"})
    })
})

router.route("/get/:id").checkout(async(req, res)=>{
    let userId = req.params.id;
    await Student.findById(userId).then(()=>{
        res.status(200).send({status:"User fetched",user: user})   
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status:"Error with get user",error:err.message});
    })
})




module.exports = router;