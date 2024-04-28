import React, { useState } from "react";
import axios from "axios";

export default function AddStudent() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");

  function sentData(e) {
    e.preventDefault(); // Prevent default form submission behavior

    const newStudent = { name, age, address };
    console.log(newStudent);

    axios.post("http://localhost:8070/student/add", newStudent)
      .then(() => {
        alert("Student Added Successfully");
        
      })
      .catch((err) => {
        alert(err);
      });
  } 

  return (
    <form onSubmit={sentData}>
      <div className="container">
        <div className="mb-3">
          <label htmlFor="InputName" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="InputName" placeholder="Enter Name" 
            onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="InputAge" className="form-label">Age</label>
          <input type="text" className="form-control" id="InputAge" placeholder="Enter Age"
            onChange={(e) => setAge(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="InputAddress" className="form-label">Address</label>
          <input type="text" className="form-control" id="InputAddress" placeholder="Enter Address"
            onChange={(e) => setAddress(e.target.value)} />
        </div>

        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Agree with terms and conditions</label>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </div>
    </form>
  );
}
