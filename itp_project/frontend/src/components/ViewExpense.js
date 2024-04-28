import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function ViewExpense(){
    const [expenses, setExpense] = useState([]);
    useEffect(() =>{
        const getExpense = () => {
            axios.get("http://localhost:8070/expense/").then((res) =>{
                setExpense(res.data);

            }).catch((err) => {
                alert(err.message);
            })
        }
        getExpense();
    }, [])

 //delete row
 const deleteExpense = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Expense?");
    if (confirmDelete) {
        try {
            await axios.delete(`http://localhost:8070/expense/delete/${id}`);
            setExpense(expenses.filter(expense => expense._id !== id));
             
        } catch (err) {
            alert("Error deleting expense: " + err.message);
        }
    }
};

//update row



 return(
<div className="container">
    <br></br>
    
            <h3>Expences</h3>
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
                    {expenses.map((expense, index) => (
                        <tr key={index}>
                            <td>{expense.title}</td>
                            <td>{expense.amount}</td>
                            <td>{expense.date}</td>
                            <td>{expense.other}</td>
                            <td className="d-grid gap-2 d-md-flex justify-content-md-start">
                            
                                <Link type="button" className="btn btn-warning" to={`/expense/update/${expense._id}`}><i class="bi bi-pencil-square"></i></Link>
                                  
                                
                                <button type="button" className="btn btn-danger" onClick={() => deleteExpense(expense._id)}><i className="bi bi-trash3"></i></button>
                               
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <Link type="button" class="btn btn-primary" to={`/expense/add`}>Add Expense <i class="bi bi-plus-square"></i></Link>
            <button type="button" className="btn btn-success">Download <i class="bi bi-download"></i></button>
            </div>
        </div>   
 )
}
