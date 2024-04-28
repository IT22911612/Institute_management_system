import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

export default function ViewIncome(){

    const [incomes, setIncome] = useState([]);

    useEffect(() =>{
        const getIncome = () => {
            axios.get("http://localhost:8070/income/").then((res) =>{
                setIncome(res.data);

            }).catch((err) => {
                alert(err.message);
            })
        }
        getIncome();
    }, [])
   
//delete row
const deleteIncome = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Income?");
    if (confirmDelete) {
        try {
            await axios.delete(`http://localhost:8070/income/delete/${id}`);
            setIncome(incomes.filter(income => income._id !== id));
             
        } catch (err) {
            alert("Error deleting income: " + err.message);
        }
    }
};
 return(
<div className="container">
    <br></br>
<h3>Incomes</h3>
            <table className='table table-sm'> 
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Other</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {incomes.map((income, index) => (
                        <tr key={index}>
                            <td>{income.title}</td>
                            <td>{income.amount}</td>
                            <td>{income.date}</td>
                            <td>{income.other}</td>
                            <td className="d-grid gap-2 d-md-flex justify-content-md-start">
                            
                            <Link type="button"  className="btn btn-warning" to={`/income/update/${income._id}`}><i class="bi bi-pencil-square"></i></Link>
                                  
                            <button type="button" className="btn btn-danger" onClick={()=> deleteIncome(income._id)}><i class="bi bi-trash3"></i></button>
                            
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <Link type="button" class="btn btn-primary" to={`/income/add`}>Add Income <i class="bi bi-plus-square"></i></Link>
            <button type="button" className="btn btn-success">Download <i class="bi bi-download"></i></button>
            </div>
            </div>   
 )
}
