import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Project.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify CSS


function Projects() {
  const [projects, setProjects] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  // Fetch projects data from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/projects`);  // Adjust your backend URL if needed
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/notifications`);
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  // Delete project and its related parts
  const handleDelete = async (projectId) => {
    // Show a confirmation message using Toastify
    const confirmDelete = window.confirm('Are you sure you want to delete this project and all its related parts?');
    if (confirmDelete) {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/projects/${projectId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Remove the deleted project from the state
          setProjects((prevProjects) => prevProjects.filter(project => project.id !== projectId));
          toast.success('Project and related parts deleted successfully!');
        } else {
          toast.error('Error deleting project.');
        }
      } catch (error) {
        toast.error('Error deleting project.');
        console.error('Error deleting project:', error);
      }
    }
  };

    // Handle clicking outside the sidebar to close it
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (event.target.closest('.notification-sidebar') || event.target.closest('.notifications-container')) {
          // Don't close the sidebar if the click is inside it
          return;
        }
        // Close the sidebar if clicked outside
        setIsSidebarVisible(false);
        setOverlayVisible(false);
      };
  
      // Listen for clicks outside of the sidebar
      document.addEventListener('click', handleClickOutside);
  
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, []);

  const clearNotifications = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/delete_notifications`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setNotifications([]);  
      } else {
        toast.error('Error clearing notifications.');
      }
    } catch (error) {
      toast.error('Error clearing notifications.');
      console.error('Error clearing notifications:', error);
    }
  };
  
  return (
    <div>
      <div className="projects-container">
        <div className="header-container">
          <h3>Project List
          </h3>
          
          {/* Notifications Button */}
          <div>
            <button
              type="button"
              className="btn btn-secondary float-end"
              onClick={() => setCollapsed(!collapsed)}  // Toggle the collapse state
            >
              <i class="bi bi-bell fs-4"></i>
            </button>
          </div>
        </div>



        {/* Notifications Card */}
        <div
          className={`notifications-card ${collapsed ? 'collapsed' : 'expanded'} notification-sidebar`}
        >
          <Link
              className="float-end"
              onClick={clearNotifications}
            >
              Clear All
            </Link>
          <div className="card card-body">
            {/* Clear All Notifications Link */}
            

            {notifications.length === 0 ? (
              <p>No notifications available.</p>
            ) : (
              <ul>
                {notifications.map((note) => (
                  <li key={note.id}>{note.message}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <Link to="/dashboard/projectForm" className="btn btn-success">
          Add Project
        </Link>
        <Link to="/dashboard/project_phase" className="btn btn-success ms-2">
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
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </button>
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
