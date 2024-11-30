import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';  // Removed Outlet
import { useEmployee } from './EmployeePanel/EmployeeContext';

import './EmployeeDetail.css';

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState(null); // Set to null initially
  const { employeeId: contextEmployeeId } = useEmployee();  // Access employeeId from context
  const { id } = useParams();  // Get employee ID from the URL parameters
  const navigate = useNavigate();

  useEffect(() => {
    const effectiveEmployeeId = id || contextEmployeeId;
    console.log("Effective Employee ID:", effectiveEmployeeId);

    if (!effectiveEmployeeId) {
      navigate('/'); // Redirect to home or login if employeeId is not available
      return;
    }

    // Fetch employee details using the employeeId from the URL or context
    axios.get(`http://localhost:3000/employee/detail/${effectiveEmployeeId}`)
      .then(result => {
        setEmployee(result.data[0]); // Assuming the employee data is in the first index
      })
      .catch(err => console.log(err));
  }, [id, contextEmployeeId, navigate]);

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
            <li><Link to={`/employee_detail/${id || contextEmployeeId}/assigned_work`}>Assigned Work</Link></li> {/* Updated link */}
            <li><Link to="/">Add Employee</Link></li>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
