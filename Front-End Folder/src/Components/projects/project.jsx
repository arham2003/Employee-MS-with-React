import React from 'react'
import { Link } from 'react-router-dom'
import './Project.css'

function Projects() {
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

  return (
    <div>


      

    <div className="projects-container">
      <div className="header-container">
        <h3>Project List</h3>
      </div>
      <Link to="/dashboard/projectForm" className="btn btn-success">
        Add Project
      </Link>

      <div className="projects-list row row-cols-md-3">
        {projects.map((project) => (
          <div key={project.id} className="col mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{project.projectName}</h5>
                <p className="card-text">Start Date: {project.startDate}</p>
                <p className="card-text">Status: {project.status}</p>
                <Link to={`/dashboard/project/${project.id}`} className="btn btn-success">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default Projects
