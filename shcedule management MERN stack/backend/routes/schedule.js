const router = require("express").Router();
const { Router } = require("express");
let Schedule = require("../models/schedule.js");



router.route("/add").post((req,res) =>{

    
    const subject = req.body.subject;
    const grade = req.body.grade;
    const date = req.body.date;
    const start_time = req.body.start_time;
    const end_time = req.body.end_time;
    const location = req.body.location;

    const newSchedule = new Schedule({
        
        subject,
        grade,
        date,
        start_time,
        end_time,
        location
    });

    newSchedule.save().then(() =>{
        res.json("Schedule Added");
    }).catch((err) => {
        console.log(err);
    });

})

router.route("/").get((req,res) => {
    Schedule.find().then((schedule) => {
        res.json(schedule);
    }).catch((err) => {
        console.log(err);
    });
})

router.route("/update/:id").put(async(req,res) =>{
    let scheduleId = req.params.id;
    const {subject, grade, date, start_time, end_time, location} = req.body;

    const updateSchedule = {
        
        subject,
        grade,
        date,
        start_time,
        end_time,
        location
    }

    const update = await Schedule.findByIdAndUpdate(scheduleId, updateSchedule).then(() => {
        res.status(200).send({status: "User Updated"});
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error with updating data.", error: err.message});
    });
})

router.route("/delete/:id").delete(async(req,res) => {
    let scheduleId = req.params.id;

    await Schedule.findByIdAndDelete(scheduleId).then(() =>{
        res.status(200).send({status: "Schedule Deleted"});
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error with deleting data.", error: err.message});
    });
})

router.route("/get/:id").get(async(req,res) => {
    let scheduleId = req.params.id;
    const user = await Schedule.findById(scheduleId).then((schedule) =>{
        res.status(200).send({status: "Schedule fetched", schedule});
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.message});
    })
})

module.exports = router;