import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Project.css';

function Projects() {
  const [projects, setProjects] = useState([]);

  // Fetch projects data from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:3000/projects');  // Adjust your backend URL if needed
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <div className="projects-container">
        <div className="header-container">
          <h3>Project List</h3>
        </div>
        <Link to="/dashboard/projectForm" className="btn btn-success">
          Add Project
        </Link>
        <Link to="/dashboard/project_phase" className="btn btn-success">
          Add Phase
        </Link>

        <div className="projects-list row">
          {projects.map((project) => (
            <div key={project.id} className="col mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{project.projectName}</h5>
                  <p className="card-text">Start Date: {new Date(project.startDate).toLocaleDateString()}</p>
                  <p className="card-text">Status: {project.status}</p>
                  <Link to={`/dashboard/project/${project.id}`} className="btn btn-success">View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;
