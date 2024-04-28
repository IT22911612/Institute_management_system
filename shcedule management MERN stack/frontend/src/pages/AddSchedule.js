import React, { useState } from "react";
import backgroundImage from "../images/bg.png"; 
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios"; 

export default function AddSchedule() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: "",
    grade: "",
    date: "",
    start_time: "",
    end_time: "",
    location: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "subject" && /\d/.test(value)) {
      
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.post("http://localhost:8070/schedule/add", formData);

      
      console.log("Schedule added successfully:", response.data);
      
      window.alert("Schedule added successfully!");

      navigate('/allSchedules'); 
    } catch (error) {
      console.error("Error adding schedule:", error);
      
    }
  };

  return (
    <div>
      <Header />
      <div style={{
        backgroundImage: `url(${backgroundImage})`,  
        backgroundSize: "cover", 
        backgroundRepeat: "no-repeat", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}>
        <form onSubmit={handleSubmit} style={{ width: "300px", backgroundColor: "rgba(255, 255, 255, 0.8)", padding: "20px", borderRadius: "10px" }}>
          <div className="mb-3">
            <label htmlFor="exampleInputSubject" className="form-label">
              Subject
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputSubject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputGrade" className="form-label">
              Grade
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputGrade"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputDate" className="form-label">
              Date
            </label>
            <input
              type="date"
              className="form-control"
              id="exampleInputDate"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputStartTime" className="form-label">
              Start Time
            </label>
            <input
              type="time"
              className="form-control"
              id="exampleInputStartTime"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEndTime" className="form-label">
              End Time
            </label>
            <input
              type="time"
              className="form-control"
              id="exampleInputEndTime"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputLocation" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputLocation"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

