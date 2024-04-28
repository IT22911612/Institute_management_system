import React, { useState, useEffect } from "react";
import axios from "axios";


export default function ScheduleManagement() {
    const [CurrentShedules, setCurrentShedules] = useState([]);
    const [formData, setFormData] = useState({
      subject: "",
      grade: "",
      date: "",
      start_time: "",
      end_time: "",
      location: ""
    });

    useEffect(() => {
        fetchCurrentShedules();
      }, []);

    const fetchCurrentShedules = async () => {
        try {
          const response = await axios.get("http://localhost:8070/schedules/");
          setCurrentShedules(response.data);
        } catch (error) {
          console.error("Error fetching Class Schedule:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post("http://localhost:8070/schedules/add", formData);
          fetchCurrentShedules();
          setFormData({
            subject: "",
            grade: "",
            date: "",
            start_time: "",
            end_time: "",
            location: ""
          });
          alert("Class Schedule Added!");
        } catch (error) {
          console.error("Error adding Class Schedule:", error);
          alert("Error adding Class Schedule");
        }
    };

    const handleUpdate = async (scheduleId) => {
        try {
          await axios.put(`http://localhost:8070/schedules/update/${scheduleId}`, formData);
          fetchCurrentShedules();
          alert("Class Schedule Updated!");
        } catch (error) {
          console.error("Error updating Class Schedule:", error);
          alert("Error updating Class Schedule");
        }
      };

      const handleDelete = async (scheduleId) => {
        try {
          await axios.delete(`http://localhost:8070/schedules/delete/${scheduleId}`);
          fetchCurrentShedules();
          alert("Class Schedule Deleted!");
        } catch (error) {
          console.error("Error deleting Class Schedule:", error);
          alert("Error deleting Class Schedule");
        }
      };

      return (
        <div>
          <h2>Class Schedule Management</h2>
          <form onSubmit={handleSubmit}>
            <input
               type="text"
               className="form-control"
               id="exampleInputSubject"
               name="subject"
               value={formData.subject}
               onChange={handleChange}
            />
            
            <input
              type="text"
              placeholder="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
            <input
             type="text"
             className="form-control"
             id="exampleInputGrade"
             name="grade"
             value={formData.grade}
             onChange={handleChange}
            />
            <input
              type="date"
              className="form-control"
              id="exampleInputDate"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
            <input
              type="time"
              className="form-control"
              id="exampleInputStartTime"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
            />
            <input
              type="time"
              className="form-control"
              id="exampleInputEndTime"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
            />
            <input
              type="text"
              className="form-control"
              id="exampleInputLocation"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
            <button type="submit">Add Schedule</button>
          </form>
    
          <ul>
            {CurrentShedules.map((schedule) => (
              <li key={schedule._id}>
                <button onClick={() => handleUpdate(schedule._id)}>Update</button>
                <button onClick={() => handleDelete(schedule._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      );




















}