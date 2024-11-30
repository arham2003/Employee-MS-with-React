import React from 'react';
import { Link, useParams } from 'react-router-dom';

const AssignedWork = () => {
  const { id } = useParams(); // Use params to get employee ID from the URL

  return (
    <div className="employee-page">
      {/* Header */}
      <div className="p-2 d-flex justify-content-center shadow header">
        <h4>Employee Management System</h4>
      </div>

      {/* Layout with Sidebar and Main Content */}
      <div className="d-flex">
        {/* Sidebar */}
        <div className="sidebar">
          <ul className="sidebar-menu">
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to={`/employee_detail/${id}/assigned_work`}>Assigned Work</Link></li>
            <li><Link to="/">Add Employee</Link></li>
            <li><Link to="/">Logout</Link></li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="content flex-grow-1">
          <div className="d-flex justify-content-center flex-column align-items-center mt-3">
            <h2>Assigned Work</h2>
            <p>Details of assigned work go here...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignedWork;
