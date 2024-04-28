const router = require("express").Router();
let Student = require("../modules/student");

// Insert student
router.route("/add").post((req, res) => {
    const name = req.body.name;
    const age = Number(req.body.age);
    const address = req.body.address;

    const newStudent = new Student({
        name,
        age,
        address
    });

    newStudent.save()
        .then(() => {
            res.json("Student Added");
        })
        .catch((err) => {
            console.log(err);
        });
});

// View students
router.route("/").get((req, res) => {
    Student.find()
        .then((students) => {
            res.json(students);
        })
        .catch((err) => {
            console.log(err);
        });
});

// Update student
router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id;
    const { name, age, address } = req.body;

    const updateStudent = {
        name,
        age,
        address
    };

    try {
        const update = await Student.findByIdAndUpdate(userId, updateStudent);
        res.status(200).send({ status: "User Updated"});
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    }
});

// Delete student
router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    try {
        await Student.findByIdAndDelete(userId);
        res.status(200).send({ status: "User deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with deleting user", error: err.message });
    }
});

//get details using id
router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const user = await Student.findById(userId).then((student)=>{
        res.status(200).send({status: "User fetched" , student})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "error with get user" , error: err.message});
    }) 
})

module.exports = router;
