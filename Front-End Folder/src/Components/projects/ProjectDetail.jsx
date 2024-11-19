import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Table, Button, Modal } from "react-bootstrap";
import ProjectPartForm from "./ProjectPartForm"; // Import the modal form component
import ProjectForm from "./ProjectForm"; // Import the ProjectForm component
import "./ProjectDetail.css";
import axios from "axios"; // Axios for making API calls

function ProjectDetail() {
  const { id } = useParams(); // Get the project ID from URL params
  const [project, setProject] = useState(null); // Project details state
  const [projectParts, setProjectParts] = useState([]); // Project parts state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [newPart, setNewPart] = useState({
    part: "",
    employee: "",
    department: "",
    startDate: "",
    endDate: "",
    status: "",
    contribution: "",
  });

  const [showForm, setShowForm] = useState(false); // Modal state
  const [isEditing, setIsEditing] = useState(false); // State to track if we are editing a part
  const [showProjectModal, setShowProjectModal] = useState(false); // Modal for editing project details

  // Fetch project details and parts from the backend
  useEffect(() => {
    console.log(id);
    const fetchProjectData = async () => {
      try {
        // Fetch project data
        const response = await fetch(
          `http://localhost:3000/api/projects/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch project data");
        }
        const projectData = await response.json();
        setProject(projectData); // Store project data

        // Fetch project parts data
        const partsResponse = await fetch(
          `http://localhost:3000/project_parts/${id}`
        );
        if (!partsResponse.ok) {
          throw new Error("Failed to fetch project parts data");
        }
        const partsData = await partsResponse.json();
        setProjectParts(partsData); // Store project parts data
      } catch (err) {
        console.error("Error fetching project data:", err);
        setError("Error fetching project data"); // Optional: display error to user
      } finally {
        setLoading(false); // Optional: set loading state to false after data is fetched
      }
    };

    fetchProjectData();
  }, [id]);

  // Handle change for adding/editing a part
  const handlePartChange = (e) => {
    const { name, value } = e.target;
    setNewPart((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission for adding or updating a part
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      updatePart();
    } else {
      addPart();
    }
  };

  // Add a new part
  const addPart = () => {
    // You would also want to save it to the backend here
    setProjectParts((prevState) => [...prevState, newPart]);
    resetForm(); // Reset the form and hide it
  };

  // Edit a part
  const editPart = (part) => {
    setNewPart(part); // Set the selected part to the form fields for editing
    setShowForm(true); // Show the form for editing
    setIsEditing(true); // Mark that we are editing
  };

  // Update a part after editing
  const updatePart = () => {
    // Here you would also update it in the backend via an API
    const updatedParts = projectParts.map((part) =>
      part.part === newPart.part ? newPart : part
    );
    setProjectParts(updatedParts);
    resetForm(); // Reset the form and hide it
  };

  // Remove a part
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/project_parts/${id}`)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload(); // Optionally reload the page to reflect the changes
        } else {
          alert(result.data.Error); // Display any error from the response
        }
      })
      .catch((err) => console.log(err)); // Catch any errors
  };
  


  // Function to reset the form
  const resetForm = () => {
    setNewPart({
      part: "",
      employee: "",
      department: "",
      startDate: "",
      endDate: "",
      status: "",
      contribution: "",
    });
    setIsEditing(false); // Reset editing state
    setShowForm(false); // Hide the form modal
  };

  // Handle project details form visibility
  const toggleProjectForm = () => {
    setShowProjectModal(true); // Show the project details modal
  };

  // Handle closing the project details modal
  const handleCloseProjectModal = () => {
    setShowProjectModal(false); // Hide the project details modal
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const options = {
      timeZone: "Asia/Karachi", // Specify the timezone as Karachi (Pakistan Standard Time)
      weekday: "short", // "Sat"
      day: "numeric", // "30"
      month: "short", // "Nov"
      year: "numeric", // "30"
      // hour: '2-digit',          // "07"
      // minute: '2-digit',        // "00"
      // hour12: true,             // Use 12-hour time
    };

    return date.toLocaleString("en-US", options); // Format and return the date
  };

  return (
    <div
      className="project-detail-container"
      style={{ padding: "20px", textAlign: "center" }}
    >
      {project ? (
        <div className="project-details">
          <Button
            variant="primary"
            onClick={toggleProjectForm}
            style={{ marginBottom: "20px" }}
          >
            Edit Project Details
          </Button>

          {/* Modal for Editing Project Details */}
          <Modal show={showProjectModal} onHide={handleCloseProjectModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Project Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ProjectForm /> {/* Your ProjectForm component goes here */}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseProjectModal}>
                Close
              </Button>
              <Button variant="primary" onClick={handleCloseProjectModal}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

          <h3>{project.projectName}</h3>
          <ProgressBar
            now={project.progress}
            label={`${project.progress}%`}
            style={{ marginBottom: "20px" }}
          />

          {/* Project Details Table */}
          <h5>Project Details</h5>
          <Table striped bordered hover style={{ marginBottom: "40px" }}>
            <tbody>
              <tr>
                <td>
                  <strong>Customer:</strong>
                </td>
                <td>{project.customerName}</td>
              </tr>
              <tr>
                <td>
                  <strong>Start Date:</strong>
                </td>
                <td>{formatDate(project.startDate)}</td>
              </tr>
              <tr>
                <td>
                  <strong>End Date:</strong>
                </td>
                <td>{formatDate(project.expectedDate)}</td>
              </tr>
              <tr>
                <td>
                  <strong>Budget:</strong>
                </td>
                <td>${project.budget.toLocaleString()}</td>
              </tr>
              <tr>
                <td>
                  <strong>Status:</strong>
                </td>
                <td>{project.status}</td>
              </tr>
            </tbody>
          </Table>

          {/* Project Parts Table */}
          <h5>Project Parts</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Part</th>
                <th>Employee</th>
                <th>Department</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Contribution (%)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
  {projectParts.map((part, index) => (
    <tr key={index}>
      <td>{part.part_name}</td>
      <td>{part.part_id}</td>
      <td>{part.department}</td>
      <td>{formatDate(part.start_date)}</td>
      <td>{formatDate(part.end_date)}</td>
      <td>{part.status}</td>
      <td>{part.contribution_percentage}</td>
      <td>
        <Button variant="info" onClick={() => editPart(part)}>
          Edit
        </Button>{" "}
        <Button
          variant="danger"
          onClick={() => handleDelete(part.part_id)} // Pass the part_id directly
        >
          Delete
        </Button>
      </td>
    </tr>
  ))}
</tbody>
            
          </Table>

          {/* Add New Part Button */}
          <Button variant="primary" onClick={() => setShowForm(true)}>
            Add New Part
          </Button>

          {/* Modal Form for Adding/Editing a Part */}
          <ProjectPartForm
            newPart={newPart}
            handlePartChange={handlePartChange}
            handleFormSubmit={handleFormSubmit}
            isEditing={isEditing}
            show={showForm}
            handleClose={resetForm}
          />
        </div>
      ) : (
        <p>Project not found</p>
      )}
    </div>
  );
}

export default ProjectDetail;
