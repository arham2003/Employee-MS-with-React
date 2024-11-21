import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


function ProjectPhaseForm() {
  const [newPhase, setNewPhase] = useState({
    projectId: '',
    part: '', // Changed to 'part' to match API
    employee: '',
    department: '',
    startDate: '',
    endDate: '',
    status: '',
    contribution: ''
  });

  const [projects, setProjects] = useState([]);  // State to store project data
  const [show, setShow] = useState(true);  // Manage modal visibility
  const [isEditing, setIsEditing] = useState(false);  // Track if it's in editing mode

  // Fetch project data when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3000/get_project_ids');
        setProjects(response.data);  // Store the fetched projects in the state
      } catch (error) {
        console.error('Error fetching projects:', error.message);
      }
    };

    fetchProjects();  // Call the function to fetch projects
  }, []); // Empty dependency array means this effect runs only once after the initial render

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewPhase((prevPhase) => ({
      ...prevPhase,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(newPhase)

    // Check if all fields are filled
    if (!newPhase.projectId || !newPhase.part || !newPhase.employee || !newPhase.department || !newPhase.startDate || !newPhase.endDate || !newPhase.status || !newPhase.contribution) {
      alert('All fields are required');
      return;
    }

    try {
      const url = `http://localhost:3000/add_projectpart/${newPhase.projectId}`;
      const response = await axios.post(url, newPhase);

      console.log(response.data);
      alert('Phase added successfully!');
      
      // Close the modal after submission
      setShow(false);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error adding phase:', error.response ? error.response.data : error.message);
      alert('Failed to add phase. Please try again.');
    }
  };

  const handleClose = () => {
    
    setShow(false)};  // Close modal handler
    // navigate('/dashboard')

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? 'Edit Phase' : 'Add New Phase'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group>
            <Form.Label>Project</Form.Label>
            <Form.Control
              as="select"
              name="projectId"
              value={newPhase.projectId}
              onChange={handleFormChange}
              required
            >
              <option value="">Select Project</option>
              {projects.length > 0 ? (
                projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.projectName}  {/* Make sure 'projectName' is correct field */}
                  </option>
                ))
              ) : (
                <option disabled>No projects available</option>
              )}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Phase</Form.Label>
            <Form.Control
              type="text"
              name="part"  // Changed to 'part' to match API
              value={newPhase.part}
              onChange={handleFormChange}
              placeholder="Enter phase name"
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Employee</Form.Label>
            <Form.Control
              type="number"
              name="employee"
              value={newPhase.employee}
              onChange={handleFormChange}
              placeholder="Enter employee ID"
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              name="department"
              value={newPhase.department}
              onChange={handleFormChange}
              placeholder="Enter department"
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={newPhase.startDate}
              onChange={handleFormChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={newPhase.endDate}
              onChange={handleFormChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={newPhase.status}
              onChange={handleFormChange}
              required
            >
              <option value="">Select Status</option>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Contribution (%)</Form.Label>
            <Form.Control
              type="number"
              name="contribution"
              value={newPhase.contribution}
              onChange={handleFormChange}
              placeholder="Enter contribution percentage"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            {isEditing ? 'Update Phase' : 'Add Phase'}
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} >
          Close
          
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProjectPhaseForm;
