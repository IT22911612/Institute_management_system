const router = require("express").Router();
const { Router } = require("express");
let Patient = require("../models/patient.js");

router.route("/add").post((req,res) =>{

    const name = req.body.name;
    const email = req.body.email;
    const age = Number(req.body.age);
    const gender = req.body.gender;
    const address = req.body.address;
    const tpNumber = Number(req.body.tpNumber);
    const service = req.body.service;
    const time = req.body.time;

    const newPatient = new Patient({
        name,
        email,
        age,
        gender,
        address,
        tpNumber,
        service
    });

    newPatient.save().then(() =>{
        res.json("Patient Added");
    }).catch((err) => {
        console.log(err);
    });

})

router.route("/").get((req,res) => {
    Patient.find().then((patients) => {
        res.json(patients);
    }).catch((err) => {
        console.log(err);
    });
})

router.route("/update/:id").put(async(req,res) =>{
    let userId = req.params.id;
    const {name, email, age, gender, address, tpNumber, service} = req.body;

    const updatePatient = {
        name,
        email,
        age,
        gender,
        address,
        tpNumber,
        service
    }

    const update = await Patient.findByIdAndUpdate(userId, updatePatient).then(() => {
        res.status(200).send({status: "User Updated"});
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error with updating data.", error: err.message});
    });
})

router.route("/delete/:id").delete(async(req,res) => {
    let userId = req.params.id;

    await Patient.findByIdAndDelete(userId).then(() =>{
        res.status(200).send({status: "User Deleted"});
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error with deleting data.", error: err.message});
    });
})

router.route("/get/:id").get(async(req,res) => {
    let userId = req.params.id;
    const user = await Patient.findById(userId).then((patient) =>{
        res.status(200).send({status: "User fetched", patient});
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.message});
    })
})

module.exports = router;