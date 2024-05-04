const express = require("express");
const router = express.Router();
const Helpdesk = require("../models/helpdeskModel");

// Route to create a new helpdesk ticket
router.post("/helpdesk", async (req, res) => {
    try {
        const newTicket = await Helpdesk.create(req.body);
        res.status(201).json(newTicket);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route to get all helpdesk tickets
router.get("/helpdesk", async (req, res) => {
    try {
        const tickets = await Helpdesk.find();
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to get a single helpdesk ticket
router.get("/helpdesk/:id", getTicket, (req, res) => {
    res.json(res.ticket);
});

// Middleware function to get a single helpdesk ticket by ID
async function getTicket(req, res, next) {
    let ticket;
    try {
        ticket = await Helpdesk.findById(req.params.id);
        if (ticket == null) {
            return res.status(404).json({ message: "Ticket not found" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.ticket = ticket;
    next();
}

// Route to update a helpdesk ticket
router.patch("/helpdesk/:id", getTicket, async (req, res) => {
    if (req.body.issue_status != null) {
        res.ticket.issue_status = req.body.issue_status;
    }
    if (req.body.issue_description != null) {
        res.ticket.issue_description = req.body.issue_description;
    }
    try {
        const updatedTicket = await res.ticket.save();
        res.json(updatedTicket);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route to delete a helpdesk ticket
router.delete("/helpdesk/:id", getTicket, async (req, res) => {
    try {
        await res.ticket.remove();
        res.json({ message: "Ticket deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
