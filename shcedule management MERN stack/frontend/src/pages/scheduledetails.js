import React from "react";

export default function UpdateClassSchedule({ schedule, handleUpdate }) {
  return (
    <div className="details">
      <h2>Update Schedule</h2>
      <p>Subject: {schedule.subject}</p>
      <p>Grade: {schedule.grade}</p>
      <p>Date: {schedule.date}</p>
      <p>Start Time: {schedule.start_time}</p>
      <p>End Time: {schedule.end_time}</p>
      <p>Location: {schedule.location}</p>
      <div>
        <button onClick={() => handleUpdate(schedule._id)}>Update</button>
      </div>
    </div>
  );
}