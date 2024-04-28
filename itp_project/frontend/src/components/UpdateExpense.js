import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';

export default class UpdateExpense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            amount: "",
            date: "",
            other: ""
        };
    }

    componentDidMount() {
        const expenseId = window.location.pathname.split('/')[3]; // Assuming you pass the expense ID as a parameter
        axios.get(`http://localhost:8070/expense/get/${expenseId}`)
            .then(response => {
                const { title, amount, date, other } = response.data.expense;
                this.setState({ title, amount, date, other });
            })
            .catch(error => {
                console.log("Error fetching expense:", error);


                
            });
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { title, amount, date, other } = this.state;
        const expenseId = window.location.pathname.split('/')[3]; // Assuming you pass the expense ID as a parameter
        const updatedExpense = {
            title,
            amount,
            date,
            other
        };
        try {
            await axios.put(`http://localhost:8070/expense/update/${expenseId}`, updatedExpense);
            alert("Expense updated successfully");
        } catch (error) {
            alert("Error updating expense: " + error.message);
        }
    };

    render() {
        const { title, amount, date, other } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
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
                        <tr>
                            <td><input type='text' name="title" value={title} onChange={this.handleInputChange} /></td>
                            <td><input type='text' name="amount" value={amount} onChange={this.handleInputChange} /></td>
                            <td><input type='text' name="date" value={date} onChange={this.handleInputChange} /></td>
                            <td><input type='text' name="other" value={other} onChange={this.handleInputChange} /></td>
                            <td>
                                <button type="submit">Submit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        );
    }
}
