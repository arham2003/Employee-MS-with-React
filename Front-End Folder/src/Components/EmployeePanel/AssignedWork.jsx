import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const AssignedWork = () => {
  const { id } = useParams(); // Extract the employee ID from the URL
  const [assignedWork, setAssignedWork] = useState([]); // State to hold assigned work data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    console.log("Id = ",id)
    // Fetch data from the API when the component mounts
    axios.get(`http://localhost:3000/employee_detail/${id}/assigned_work`)
      .then((response) => {
        if (response.data.Status) {
          setAssignedWork(response.data.Result); // Use the "Result" key to get the data
        } else {
          console.error("No assigned work found for this employee.");
        }
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching assigned work:", error);
        setLoading(false); // Stop loading in case of error
      });
      console.log(assignedWork)

  }, [id]); // Refetch when the `id` changes

  // Render a loading message while the data is being fetched
  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <p>Loading assigned work...</p>
      </div>
    );
  }

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
            {/* <p>Details of assigned work for employee {assignedWork.employee_name}</p> */}
          </div>

          {/* Assigned Work Table */}
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Part Name</th>
                  <th>Project Name</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Contribution (%)</th>
                </tr>
              </thead>
              <tbody>
                {assignedWork.length > 0 ? (
                  assignedWork.map((work) => (
                    <tr key={work.part_id}>
                      <td>{work.part_name}</td>
                      <td>{work.project_name}</td>
                      <td>{new Date(work.start_date).toLocaleDateString()}</td>
                      <td>{new Date(work.end_date).toLocaleDateString()}</td>
                      <td>{work.status}</td>
                      <td>{work.contribution_percentage}%</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No assigned work found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignedWork;
