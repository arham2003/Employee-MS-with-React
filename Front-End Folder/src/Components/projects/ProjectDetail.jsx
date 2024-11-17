import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Table, Button, Modal } from 'react-bootstrap';
import ProjectPartForm from './ProjectPartForm'; // Import the modal form component
import ProjectForm from './ProjectForm'; // Import the ProjectForm component
import './ProjectDetail.css';

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
  ];

  const { id } = useParams();
  const project = projects.find(p => p.id === parseInt(id));

  const [projectParts, setProjectParts] = useState(project ? project.projectParts : []);
  const [newPart, setNewPart] = useState({
    part: '',
    employee: '',
    department: '',
    startDate: '',
    endDate: '',
    status: '',
    contribution: ''
  });

  const [showForm, setShowForm] = useState(false); // Modal state
  const [isEditing, setIsEditing] = useState(false); // State to track if we are editing a part
  const [isProjectFormVisible, setIsProjectFormVisible] = useState(false); // State for showing the project form
  const [showProjectModal, setShowProjectModal] = useState(false); // Modal for editing project details

  // Handle change for adding/editing a part
  const handlePartChange = (e) => {
    const { name, value } = e.target;
    setNewPart(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Add a new part
  const addPart = () => {
    setProjectParts(prevState => [
      ...prevState,
      newPart
    ]);
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
    const updatedParts = projectParts.map(part =>
      part.part === newPart.part ? newPart : part
    );
    setProjectParts(updatedParts);
    resetForm(); // Reset the form and hide it
  };

  // Remove a part
  const removePart = (index) => {
    const updatedParts = projectParts.filter((_, i) => i !== index);
    setProjectParts(updatedParts);
  };

  // Function to reset the form
  const resetForm = () => {
    setNewPart({
      part: '',
      employee: '',
      department: '',
      startDate: '',
      endDate: '',
      status: '',
      contribution: ''
    });
    setIsEditing(false); // Reset editing state
    setShowForm(false); // Hide the form modal
  };

  // Function to handle form submission (add or update)
  const handleFormSubmit = () => {
    if (isEditing) {
      updatePart(); // Update the part if editing
    } else {
      addPart(); // Otherwise, add a new part
    }
  };

  // Handle project details form visibility
  const toggleProjectForm = () => {
    setShowProjectModal(true); // Show the project details modal
  };

  // Handle closing the project details modal
  const handleCloseProjectModal = () => {
    setShowProjectModal(false); // Hide the project details modal
  };

  return (
    <div className="project-detail-container" style={{ padding: '20px', textAlign: 'center' }}>
      {project ? (
        <div className="project-details">
          <Button variant="primary" onClick={toggleProjectForm} style={{ marginBottom: '20px' }}>
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
                  <td>{part.part}</td>
                  <td>{part.employee}</td>
                  <td>{part.department}</td>
                  <td>{part.startDate}</td>
                  <td>{part.endDate}</td>
                  <td>{part.status}</td>
                  <td>{part.contribution}</td>
                  <td>
                    <Button variant="info" onClick={() => editPart(part)}>Edit</Button>{' '}
                    <Button variant="danger" onClick={() => removePart(index)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Add New Part Button */}
          <Button variant="primary" onClick={() => setShowForm(true)}>Add New Part</Button>

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
