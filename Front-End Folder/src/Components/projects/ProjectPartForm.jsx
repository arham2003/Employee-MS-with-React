import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function ProjectPartForm({ newPart, handlePartChange, handleFormSubmit, isEditing, show, handleClose, projectId }) {
  const [projects, setProjects] = useState([]); // Will hold both id and projectName

  useEffect(() => {
    // Fetch project data from the backend when the modal is opened
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3000/get_project_ids');
        setProjects(response.data); // Assuming response.data is an array of objects with id and projectName
      } catch (error) {
        console.error('Error fetching projects:', error.message);
      }
    };

    if (show) { // Only fetch when the modal is open
      fetchProjects();
    }
  }, [show]); // Fetch when modal opens (show state changes)

  const submitForm = async (e) => {
    e.preventDefault();
  
    try {
      if (isEditing) {
        // Update part logic (if required)
        console.log('Editing the part');
      } else {
        // Send POST request to backend to add new part
        const response = await axios.post(`http://localhost:3000/add_projectpart/${newPart.projectId || projectId}`, newPart);
        console.log(response.data);
        alert('Part added successfully!');
      }
  
      handleFormSubmit(); // Callback to handle form submission state or close modal
      handleClose(); // Close the modal after adding the part
  
    } catch (error) {
      console.error('Error adding part:', error.response ? error.response.data : error.message);
      alert('Failed to add part. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? 'Edit Part' : 'Add New Part'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitForm}>
          <Form.Group>
            <Form.Label>Project</Form.Label>
            <Form.Control
              as="select"
              name="projectId"
              value={newPart.projectId || projectId} // Use the passed projectId as default or from newPart
              onChange={handlePartChange}
              required
            >
              <option value="">Select Project</option>
              {projects.length > 0 ? (
                projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.projectName} {/* Display project name */}
                  </option>
                ))
              ) : (
                <option disabled>No projects available</option>
              )}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Part</Form.Label>
            <Form.Control
              type="text"
              name="part"
              value={newPart.part}
              onChange={handlePartChange}
              placeholder="Enter part name"
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Employee</Form.Label>
            <Form.Control
              type="number"
              name="employee"
              value={newPart.employee}
              onChange={handlePartChange}
              placeholder="Enter employee ID"
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              name="department"
              value={newPart.department}
              onChange={handlePartChange}
              placeholder="Enter department"
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={newPart.startDate}
              onChange={handlePartChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={newPart.endDate}
              onChange={handlePartChange}
              required
            />
          </Form.Group>

          {/* Dropdown for Status */}
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={newPart.status}
              onChange={handlePartChange}
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
              value={newPart.contribution}
              onChange={handlePartChange}
              placeholder="Enter contribution percentage"
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={submitForm}>
          {isEditing ? 'Update Part' : 'Add Part'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProjectPartForm;
