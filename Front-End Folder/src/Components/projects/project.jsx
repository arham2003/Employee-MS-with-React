import { Link } from "react-router-dom";
import './Project.css'; // Ensure you link to the correct CSS file

function Projects() {
  return (
    <div className="projects-container">
      <div className="header-container d-flex justify-content-center">
        <h3>Projects</h3>
      </div>

      <div className="button-container mb-4">
        <Link to="/dashboard/projectForm" className="btn btn-success">
          Add Project
        </Link>
      </div>

      <div className="projects-list">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Project 1</h5>
                <p className="card-text">Start Date: 01/01/2024</p>
                <p className="card-text">Status: Active</p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Project 2</h5>
                <p className="card-text">Start Date: 15/02/2024</p>
                <p className="card-text">Status: In Progress</p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Project 3</h5>
                <p className="card-text">Start Date: 20/03/2024</p>
                <p className="card-text">Status: Completed</p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Project 3</h5>
                <p className="card-text">Start Date: 20/03/2024</p>
                <p className="card-text">Status: Completed</p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Project 3</h5>
                <p className="card-text">Start Date: 20/03/2024</p>
                <p className="card-text">Status: Completed</p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Project 3</h5>
                <p className="card-text">Start Date: 20/03/2024</p>
                <p className="card-text">Status: Completed</p>
              </div>
            </div>
          </div>

          {/* Add more cards as needed */}
        </div>
      </div>
    </div>
  );
}

export default Projects;
