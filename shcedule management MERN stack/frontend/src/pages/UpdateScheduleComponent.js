import React, { useState } from 'react';

const styles = {
    container: {
      maxWidth: '400px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor: '#f9f9f9',
    },
    title: {
      marginBottom: '20px',
      textAlign: 'center',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      marginBottom: '5px',
    },
    input: {
      padding: '8px',
      marginBottom: '10px',
      border: '1px solid #ccc',
      borderRadius: '3px',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '20px',
    },
    button: {
      padding: '10px 20px',
      borderRadius: '3px',
      cursor: 'pointer',
    },
    updateButton: {
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
    },
    cancelButton: {
      backgroundColor: '#dc3545',
      color: '#fff',
      border: 'none',
    },
  };


function UpdateSchedule({ schedule, handleUpdate, handleCancel }) {
    const [updatedSchedule, setUpdatedSchedule] = useState({ ...schedule });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedSchedule(prevItem => ({
            ...prevItem,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdate(updatedSchedule);
    };

    const handleCancelClick = () => {
        handleCancel();
    };


    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Update Schedule</h2>
            <form style={styles.form} onSubmit={handleSubmit}>
                <div>
                    <label style={styles.label} htmlFor="subject">Subject:</label>
                    <input style={styles.input} type="text" id="subject" name="subject" value={updatedSchedule.subject} onChange={handleChange} />
                </div>
                <div>
                    <label style={styles.label} htmlFor="grade">Grade:</label>
                    <input style={styles.input} type="text" id="grade" name="grade" value={updatedSchedule.grade} onChange={handleChange} />
                </div>
                <div>
                    <label style={styles.label} htmlFor="date">Date:</label>
                    <input style={styles.input} type="text" id="date" name="date" value={updatedSchedule.date} onChange={handleChange} />
                </div>
                <div>
                    <label style={styles.label} htmlFor="start_time">Start Date:</label>
                    <input style={styles.input} type="text" id="start_time" name="start_time" value={updatedSchedule.start_time} onChange={handleChange} />
                </div>
                <div>
                    <label style={styles.label} htmlFor="end_time">End Date:</label>
                    <input style={styles.input} type="text" id="end_time" name="end_time" value={updatedSchedule.end_time} onChange={handleChange} />
                </div>
                <div>
                    <label style={styles.label} htmlFor="loaction">Location:</label>
                    <input style={styles.input} type="text" id="loaction" name="loaction" value={updatedSchedule.loaction} onChange={handleChange} />
                </div>
                <div style={styles.buttonContainer}>
                    <button style={{ ...styles.button, ...styles.updateButton }} type="submit">Update Schedule</button>
                    <button style={{ ...styles.button, ...styles.cancelButton }} type="button" onClick={handleCancelClick}>Cancel</button>
                </div>
            </form>
        </div>
    );




}

export default UpdateSchedule;

