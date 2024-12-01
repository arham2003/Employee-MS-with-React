import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useEmployee } from './EmployeePanel/EmployeeContext';

import './EmployeeDetail.css';

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState(null);
  const [totalContribution, setTotalContribution] = useState(null);
  const [approvedParts, setApprovedParts] = useState([]); // State to store approved project parts
  const [month, setMonth] = useState(1); // Default to January
  const [year, setYear] = useState(new Date().getFullYear()); // Default to current year
  const { employeeId: contextEmployeeId } = useEmployee();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const effectiveEmployeeId = id || contextEmployeeId;
    console.log("Effective Employee ID:", effectiveEmployeeId);

    if (!effectiveEmployeeId) {
      navigate('/'); // Redirect to home or login if employeeId is not available
      return;
    }

    // Fetch employee details
    axios.get(`http://localhost:3000/employee/detail/${effectiveEmployeeId}`)
      .then(result => {
        setEmployee(result.data[0]); // Assuming the employee data is in the first index
      })
      .catch(err => console.log(err));

    // Fetch the total contribution for this employee for the selected month and year
    if (effectiveEmployeeId && month && year) {
      axios.get(`http://localhost:3000/get_empContributions?year=${year}&month=${month}`)
        .then(result => {
          setTotalContribution(result.data);
        })
        .catch(err => console.log(err));
    }

    // Fetch the approved project parts for the selected month and year
    axios.get(`http://localhost:3000/approved_parts?year=${year}&month=${month}`)
      .then(result => {
        setApprovedParts(result.data); // Set the approved parts data
      })
      .catch(err => console.log(err));

  }, [id, contextEmployeeId, navigate, month, year]);

  const handleLogout = () => {
    axios.get('http://localhost:3000/employee/logout')
      .then(result => {
        if (result.data.Status) {
          localStorage.removeItem('employeeId');
          localStorage.removeItem('valid');
          navigate('/'); // Redirect after logging out
        }
      }).catch(err => console.log(err));
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="employee-page">
      <div className="p-2 d-flex justify-content-center shadow header">
        <h4>Employee Management System</h4>
      </div>
      <div className="d-flex">
        {/* Sidebar */}
        <div className="sidebar">
          <ul className="sidebar-menu">
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to={`/employee_detail/${id || contextEmployeeId}/assigned_work`}>Assigned Work</Link></li>
            <li><Link to={`/employee_detail/${id || contextEmployeeId}/attendance`}>Attendance</Link></li>
            <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="content flex-grow-1">
          <div className="d-flex justify-content-center flex-column align-items-center mt-3">
            <img src={`http://localhost:3000/Images/${employee.image}`} className="emp-det-image" alt="Employee" />
            <div className="d-flex align-items-center flex-column mt-5">
              <h3>Name: {employee.name}</h3>
              <h3>Email: {employee.email}</h3>
              <h3>Salary: ${employee.salary}</h3>
            </div>

            {/* Month and Year Selection */}
            <div className="month-year-selection mt-4">
              <label htmlFor="month">Select Month:</label>
              <select id="month" value={month} onChange={handleMonthChange}>
                {Array.from({ length: 12 }, (_, index) => (
                  <option key={index} value={index + 1}>{new Date(0, index).toLocaleString('default', { month: 'long' })}</option>
                ))}
              </select>

              <label htmlFor="year" className="ml-3">Select Year:</label>
              <select id="year" value={year} onChange={handleYearChange}>
                {Array.from({ length: 10 }, (_, index) => (
                  <option key={index} value={year - index}>{year - index}</option>
                ))}
              </select>
            </div>

            {/* Display Total Contribution */}
            {totalContribution && totalContribution.length > 0 ? (
              <div className="total-contribution mt-4">
                <h4>Total Contribution for {employee.name}: {totalContribution[0].total_contribution}%</h4>
              </div>
            ) : (
              <div className="total-contribution mt-4">
                <h4>No contribution data available for the selected period.</h4>
              </div>
            )}

            {/* Display Approved Project Parts in a Table */}
            {approvedParts.length > 0 ? (
              <div className="approved-project-parts mt-4">
                <h4>Approved Project Parts for {new Date(year, month - 1).toLocaleString('default', { month: 'long' })} {year}:</h4>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      {/* <th>Part ID</th> */}
                      <th>Part Name</th>
                      <th>Status</th>
                      <th>Submission Date</th>
                      <th>Contribution</th>

                    </tr>
                  </thead>
                  <tbody>
                    {approvedParts.map((part) => (
                      <tr key={part.part_id}>
                        {/* <td>{part.part_id}</td> */}
                        <td>{part.part_name}</td>
                        <td>{part.status}</td>
                        <td>{new Date(part.submission_datetime).toLocaleDateString()}</td>
                        <td>{part.contribution_percentage}</td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="approved-project-parts mt-4">
                <h4>No approved project parts for the selected period.</h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
