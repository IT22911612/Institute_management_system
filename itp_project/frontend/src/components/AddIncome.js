import React, { useState } from "react";
import axios from "axios";

export default function AddIncome() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [other, setOther] = useState("");
  const [amountError, setAmountError] = useState("");

  function sentData(e) {
    e.preventDefault(); // Prevent default form submission behavior

    const newIncome = { title, amount, date, other };
    console.log(newIncome);

    axios.post("http://localhost:8070/income/add", newIncome)
      .then(() => {
        alert("Transaction Successfully Added !");
        e.target.reset()
      })
      .catch((err) => {
        alert(err);
      });
  } 

  const handleAmountChange = (e) => {
    const inputAmount = e.target.value;
    // Validate if inputAmount contains only numbers
    if (/^[0-9]+$/.test(inputAmount) || inputAmount === "") {
      setAmount(inputAmount);
      setAmountError("");
    } else {
      setAmountError("Amount should contain only numbers (0-9)");
    }
  };

  return (
    <form onSubmit={sentData}>
      <div className="container">
        <div className="mb-3">
          <label htmlFor="InputName" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="InputName" placeholder="Enter Name" 
            onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="InputAmount" className="form-label">Amount</label>
          <input type="text" className="form-control" id="InputAmount" placeholder="Enter Amount"
            value={amount}
            onChange={handleAmountChange} />
          {amountError && <div className="text-danger">{amountError}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="InputDate" className="form-label">Date</label>
          <input type="date" className="form-control" id="InputDate" placeholder="Date"
            onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="InputAddress" className="form-label">Other</label>
          <input type="text" className="form-control" id="InputAddress" placeholder="Other Details"
            onChange={(e) => setOther(e.target.value)} />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </div>
    </form>
  );
}
