import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendanceRecords = () => {
    const [employees, setEmployees] = useState([]); // Store employee data
    const [month, setMonth] = useState(''); // Store selected month
    const [attendanceRecords, setAttendanceRecords] = useState([]); // Store attendance records
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch employee data on component mount
    useEffect(() => {
        axios
            .get('http://localhost:3000/auth/employee')
            .then((response) => {
                if (response.data.Status) {
                    setEmployees(response.data.Result); // Set employee data from response
                } else {
                    console.error('Error fetching employees');
                }
            })
            .catch((error) => {
                console.error('Error fetching employees:', error);
            });
    }, []);

    // Fetch attendance records for a specific month
    const fetchAttendanceRecords = () => {
        if (!month) {
            alert('Please select a month.');
            return;
        }

        setLoading(true);
        setError(null);

        // Make a request to get attendance records for the selected month
        axios.get('http://localhost:3000/get_attendanceByMonth?month=2024-11')
        // Adjust the URL to match your backend
            .then((response) => {
                if (response.status === 200) {
                    setAttendanceRecords(response.data); // Set attendance records
                } else {
                    setError('No attendance records found for the selected month.');
                }
            })
            .catch((error) => {
                console.error('Error fetching attendance records:', error);
                setError('Error fetching attendance records.');
            })
            .finally(() => {
                setLoading(false); // Stop loading after data is fetched
            });
    };

    return (
        <div className="attendance-records">
            <h2>Attendance Records for the Month</h2>

            {/* Month Selection */}
            <div className="month-picker">
                <label htmlFor="attendance-month">Select Month:</label>
                <input
                    type="month"
                    id="attendance-month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    required
                />
                <button onClick={fetchAttendanceRecords} className="fetch-btn">
                    Fetch Attendance
                </button>
            </div>

            {/* Loading and Error states */}
            {loading && <div>Loading attendance records...</div>}
            {error && <div>Error: {error}</div>}

            {/* Attendance Table */}
            {!loading && attendanceRecords.length > 0 && (
                <table className="attendance-table">
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>Date</th>
                            <th>Attendance Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceRecords.map((record) => {
                            const employee = employees.find((emp) => emp.id === record.employeeId);
                            return (
                                <tr key={`${record.employeeId}-${record.date}`}>
                                    <td>{employee ? employee.name : 'Unknown Employee'}</td>
                                    <td>{record.date}</td>
                                    <td>{record.status}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}

            {/* No Records Message */}
            {!loading && attendanceRecords.length === 0 && (
                <div>No attendance records available for this month.</div>
            )}
        </div>
    );
};

export default AttendanceRecords;
