import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './EmpAttendance.css'

const EmpAttendance = () => {
  const { employeeId } = useParams();  // Get employee ID from URL params
  const [attendanceData, setAttendanceData] = useState([]);
  const [attendanceSummary, setAttendanceSummary] = useState({
    totalAbsent: 0,
    totalPresent: 0,
    totalLeave: 0,
    totalLate: 0
  });
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default to current month
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());  // Default to current year
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch attendance data based on employeeId, month, and year
    axios.get(`http://localhost:3000/get_empAttendance_count/${employeeId}?month=${selectedMonth}&year=${selectedYear}`)
      .then((response) => {
        const data = response.data.Result[0]; // Assuming data is an array of one object
        setAttendanceSummary({
          totalAbsent: data.total_absent,
          totalPresent: data.total_present,
          totalLeave: data.total_leave,
          totalLate: data.total_late
        });
        setAttendanceData(response.data.Result); // You can keep this if you need raw data as well
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching attendance data:", error);
        setLoading(false);
      });
  }, [employeeId, selectedMonth, selectedYear]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const generateDaysInMonth = (month, year) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }
    return daysArray;
  };

  const attendanceMap = attendanceData.reduce((map, record) => {
    const date = new Date(record.date).getDate();
    map[date] = record.status; // Store status by day
    return map;
  }, {});

  const allDays = generateDaysInMonth(selectedMonth, selectedYear);

  if (loading) {
    return <div>Loading attendance data...</div>;
  }

  return (
    <div className="employee-page">
      <div className="p-2 d-flex justify-content-center shadow header">
        <h4>Employee Management System</h4>
      </div>
      <div className="d-flex">
        <div className="sidebar">
          <ul className="sidebar-menu">
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to={`/employee_detail/${employeeId}/assigned_work`}>Assigned Work</Link></li>
            <li><Link to={`/employee_detail/${employeeId}/attendance`}>Attendance</Link></li>
            <li><Link to="/" onClick={() => navigate('/logout')}>Logout</Link></li>
          </ul>
        </div>

        <div className="content flex-grow-1">
          <div className="attendance-container">
            <h3>Attendance Records</h3>

            {/* Attendance summary box */}
            <div className="attendance-summary">
              <div className="summary-box">
                <strong>Total Absent:</strong> {attendanceSummary.totalAbsent}
              </div>
              <div className="summary-box">
                <strong>Total Present:</strong> {attendanceSummary.totalPresent}
              </div>
              <div className="summary-box">
                <strong>Total Leave:</strong> {attendanceSummary.totalLeave}
              </div>
              <div className="summary-box">
                <strong>Total Late:</strong> {attendanceSummary.totalLate}
              </div>
            </div>

            {/* Month and Year Selectors */}
            <div className="filters">
              <label>
                Month:
                <select value={selectedMonth} onChange={handleMonthChange}>
                  <option value={1}>January</option>
                  <option value={2}>February</option>
                  <option value={3}>March</option>
                  <option value={4}>April</option>
                  <option value={5}>May</option>
                  <option value={6}>June</option>
                  <option value={7}>July</option>
                  <option value={8}>August</option>
                  <option value={9}>September</option>
                  <option value={10}>October</option>
                  <option value={11}>November</option>
                  <option value={12}>December</option>
                </select>
              </label>
              <label>
                Year:
                <select value={selectedYear} onChange={handleYearChange}>
                  <option value={2023}>2023</option>
                  <option value={2024}>2024</option>
                  <option value={2025}>2025</option>
                </select>
              </label>
            </div>

            {/* Attendance Data Table */}
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {allDays.map((day) => (
                  <tr key={day}>
                    <td>{day}</td>
                    <td>{attendanceMap[day] || '-'}</td> {/* Show status or dash if no record */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpAttendance;
