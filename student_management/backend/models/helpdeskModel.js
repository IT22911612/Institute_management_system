const mongoose = require("mongoose");

const helpdeskSchema = mongoose.Schema({
    student_name: String,
    student_age: String,
    student_gender: String,
    student_email: String,
    student_phone: String,
    student_address: String,
    issue_description: String,
    issue_status: {
        type: String,
        enum: ["Pending", "In Progress", "Resolved"],
        default: "Pending"
    },
}, {
    timestamps: true
});

const helpdeskModel = mongoose.model("helpdesk", helpdeskSchema);

module.exports = helpdeskModel;
