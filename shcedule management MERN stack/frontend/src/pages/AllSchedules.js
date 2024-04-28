import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faFileAlt } from '@fortawesome/free-solid-svg-icons'; 
import UpdateSchedule from './UpdateScheduleComponent';


function AllSchedules() {
    const [CurrentShedules, setCurrentShedules] = useState([]);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState(null);

    useEffect(() => {
        function getSchedules() {
            axios.get("http://localhost:8070/schedule/")
            .then(response => {
                setCurrentShedules(response.data);
            })
            .catch(error => {
                console.error('Error fetching Class Schedule:', error);
            });
        }

        getSchedules();
    }, []);


    const handleUpdate = (updatedSchedule) => {
        axios.put(`http://localhost:8070/schedule/update/${updatedSchedule._id}`, updatedSchedule)
            .then(response => {
                setCurrentShedules(prevSchedule => prevSchedule.map(schedule => schedule._id === updatedSchedule._id ? updatedSchedule : schedule));
                setShowUpdateForm(false);
                setSelectedSchedule(null);
            })
            .catch(error => {
                console.error('Error updating schedule:', error);
            });
    };

    const handleDelete = (scheduleId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this schedule?");
        if (!isConfirmed) {
            return;
        }

        axios.delete(`http://localhost:8070/schedule/delete/${scheduleId}`)
            .then(response => {
                setCurrentShedules(prevSchedule => prevSchedule.filter(schedule => schedule._id !== scheduleId));
            })
            .catch(error => {
                console.error('Error deleting schedule:', error);
            });
    };

    const generateReport = () => {
        // You can format the report as needed, for example, as a string or HTML content
        let report = "Schedule Report\n\n";
        report += "Subject\tGrade\tDate\tStart Time\tEnd Time\tLocation\n";
        CurrentShedules.forEach(schedule => {
            report += `${schedule.subject}\t${schedule.grade}\t${schedule.date}\t${schedule.start_time}\t${schedule.end_time}\t${schedule.location}\n`;
        });

        // Open the report in a new window or tab
        const reportWindow = window.open();
        reportWindow.document.write('<pre>' + report + '</pre>');
    };



    const styles = {
        scheduleContainer: {
            fontFamily: 'Arial, sans-serif',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '20px',
            borderRadius: '10px',
            backgroundColor: '#f5f5f5',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        },
        scheduleTitle: {
            fontSize: '24px',
            color: '#333',
            marginBottom: '20px',
        },
        reportBtn: {
            backgroundColor: '#ff6f61', 
            color: '#fff', 
            border: 'none',
            padding: '12px 24px', 
            borderRadius: '25px', 
            cursor: 'pointer',
            marginBottom: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
            transition: 'background-color 0.3s ease', 
        },
        reportBtnHover: {
            backgroundColor: '#ff433d', 
        },
        scheduleTable: {
            width: '100%',
            borderCollapse: 'collapse',
        },
        tableHeader: {
            backgroundColor: '#007bff',
            color: 'white',
        },
        tableRowHover: {
            backgroundColor: '#f2f2f2',
        },
        actionBtn: {
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '5px',
        },
        deleteBtn: {
            backgroundColor: '#dc3545',
        },
        actionBtnHover: {
            opacity: '0.8',
        },
    };
    



    return (
        <div>
            <h2>Class Schedules</h2>
            <button style={styles.reportBtn} onClick={generateReport}>
                <FontAwesomeIcon style={styles.icon} icon={faFileAlt} />
                Generate Report
            </button>
            <table>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Grade</th>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {CurrentShedules.map(schedule => (
                        <tr key={schedule._id}>
                            <td>{schedule.subject}</td>
                            <td>{schedule.grade}</td>
                            <td>{schedule.date}</td>
                            <td>{schedule.start_time}</td>
                            <td>{schedule.end_time}</td>
                            <td>{schedule.location}</td>
                            <td>
                                <button style={styles.updateBtn} onClick={() => {
                                    setShowUpdateForm(true);
                                    setSelectedSchedule(schedule);
                                }}>
                                    <FontAwesomeIcon style={styles.icon} icon={faEdit} />
                                    Update
                                </button>
                                <button style={styles.deleteBtn} onClick={() => handleDelete(schedule._id)}>
                                    <FontAwesomeIcon style={styles.icon} icon={faTrashAlt} />
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showUpdateForm && (
                <UpdateSchedule schedule={selectedSchedule} handleUpdate={handleUpdate} />
            )}
        </div>
    );



}

export default AllSchedules;