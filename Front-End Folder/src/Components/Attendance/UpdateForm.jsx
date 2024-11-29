import React, { useState, useEffect } from 'react';
import './AttendanceForm.css';
import axios from 'axios';

const UpdateForm = () => {
    const [date, setDate] = useState('');
    const [attendanceData, setAttendanceData] = useState({});
    const [employees, setEmployees] = useState([]);
    const [maxDate] = useState('2024-11-30'); // Set the max date to a fixed date

    // Fetch attendance data when the date is selected
    useEffect(() => {
        if (!date) return; // Skip fetching if no date is selected

        // Fetch attendance data for the selected date
        axios
            .get(`http://localhost:3000/get_attendanceByDate?date=${date}`)
            .then((response) => {
                const data = response.data;

                // Set employees data (name and status)
                setEmployees(data);

                // Map attendance data to employee names
                setAttendanceData(
                    data.reduce((acc, record) => {
                        acc[record.name] = record.status;
                        return acc;
                    }, {})
                );
            })
            .catch((error) => {
                console.error('Error fetching attendance data:', error);
                setAttendanceData({});
            });
    }, [date]);

    // Handle attendance changes
    const handleAttendanceChange = (employeeName, status) => {
        setAttendanceData((prevData) => ({
            ...prevData,
            [employeeName]: status,
        }));
    };

    // Handle form submission to update attendance
    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare the updated attendance data
        const updatedAttendance = employees.map((employee) => ({
            name: employee.name,
            status: attendanceData[employee.name] || 'Absent', // Default to 'Absent' if not selected
        }));

        // Send the data to the backend
        axios
            .put('http://localhost:3000/update_attendance', { date, attendance: updatedAttendance })
            .then(() => {
                alert('Attendance submitted successfully!');
                // Optionally, fetch updated attendance again or redirect
            })
            .catch((error) => {
                console.error('Error updating attendance:', error);
                alert('Failed to submit attendance. Please try again.');
            });

        // Reset form after submission
        setDate('');
        setAttendanceData({});
    };

    return (
        <div className="attendance-form">
            <h2>Update Employee Attendance</h2>

            {/* Date Selection */}
            <div className="date-picker">
                <label htmlFor="attendance-date">Select Date:</label>
                <input
                    type="date"
                    id="attendance-date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    max={maxDate} // Restrict selection to the max date
                />
            </div>

            {/* Attendance Table */}
            {employees.length > 0 ? (
                <form onSubmit={handleSubmit}>
                    <table className="attendance-table">
                        <thead>
                            <tr>
                                <th>Employee Name</th>
                                <th>Attendance Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <tr key={employee.name}>
                                    <td>{employee.name}</td>
                                    <td>
                                        <select
                                            value={attendanceData[employee.name] || ''}
                                            onChange={(e) =>
                                                handleAttendanceChange(employee.name, e.target.value)
                                            }
                                            required
                                        >
                                            <option value="">Select</option>
                                            <option value="Present">Present</option>
                                            <option value="Absent">Absent</option>
                                            <option value="Leave">Leave</option>
                                            <option value="Late">Late</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button type="submit" className="submit-btn">Submit Attendance</button>
                </form>
            ) : (
                <p>Select a date to view and update attendance records.</p>
            )}

            {/* Back button */}
            <button onClick={() => alert('Back button clicked (UI-only)')} className="back-btn">
                Go Back
            </button>
        </div>
    );
};

export default UpdateForm;
