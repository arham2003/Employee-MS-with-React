import React from 'react'
import { useParams } from 'react-router-dom'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { Table } from 'react-bootstrap'
import './ProjectDetail.css'

function ProjectDetail() {
  const projects = [
    { 
      id: 1, 
      projectName: 'Project A', 
      startDate: '2024-01-01', 
      endDate: '2024-12-31',
      status: 'In Progress', 
      customer: 'Customer A',
      employees: [
        { name: 'John Doe', department: 'Development' },
        { name: 'Jane Smith', department: 'Design' },
        { name: 'Mark Johnson', department: 'Marketing' }
      ],
      budget: 100000,
      progress: 60,
      projectParts: [
        { part: 'Design', employee: 'Jane Smith', department: 'Design', startDate: '2024-01-01', endDate: '2024-03-31', status: 'Completed', contribution: 30 },
        { part: 'Development', employee: 'John Doe', department: 'Development', startDate: '2024-04-01', endDate: '2024-09-30', status: 'In Progress', contribution: 50 },
        { part: 'Marketing', employee: 'Mark Johnson', department: 'Marketing', startDate: '2024-10-01', endDate: '2024-12-31', status: 'Not Started', contribution: 20 }
      ]
    },
    // Add other projects similarly...
  ]

  const { id } = useParams()  
  const project = projects.find(p => p.id === parseInt(id))  

  return (
    <div className="project-detail-container" style={{ padding: '20px', textAlign: 'center' }}>
      {project ? (
        <div className="project-details">
          <h3>{project.projectName}</h3>
          <ProgressBar now={project.progress} label={`${project.progress}%`} style={{ marginBottom: '20px' }} />

          {/* Project Details Table */}
          <h5>Project Details</h5>
          <Table striped bordered hover style={{ marginBottom: '40px' }}>
            <tbody>
              <tr>
                <td><strong>Customer:</strong></td>
                <td>{project.customer}</td>
              </tr>
              <tr>
                <td><strong>Start Date:</strong></td>
                <td>{project.startDate}</td>
              </tr>
              <tr>
                <td><strong>End Date:</strong></td>
                <td>{project.endDate}</td>
              </tr>
              <tr>
                <td><strong>Budget:</strong></td>
                <td>${project.budget.toLocaleString()}</td>
              </tr>
              <tr>
                <td><strong>Status:</strong></td>
                <td>{project.status}</td>
              </tr>
            </tbody>
          </Table>

          {/* Employees Table */}
          <h5>Employees Working On This Project</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {project.employees.map((employee, index) => (
                <tr key={index}>
                  <td>{employee.name}</td>
                  <td>{employee.department}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Project Parts Table (Wider) */}
          <h5>Project Parts Details</h5>
          <Table striped bordered hover className="wider-table">
            <thead>
              <tr>
                <th>Part</th>
                <th>Employee</th>
                <th>Department</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Contribution (%)</th>
              </tr>
            </thead>
            <tbody>
              {project.projectParts.map((part, index) => (
                <tr key={index}>
                  <td>{part.part}</td>
                  <td>{part.employee}</td>
                  <td>{part.department}</td>
                  <td>{part.startDate}</td>
                  <td>{part.endDate}</td>
                  <td>{part.status}</td>
                  <td>{part.contribution}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <p>Project not found.</p>
      )}
    </div>
  )
}

export default ProjectDetail
