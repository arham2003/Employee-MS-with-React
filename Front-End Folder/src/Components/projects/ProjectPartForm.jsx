import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function ProjectPartForm({ newPart, handlePartChange, handleFormSubmit, isEditing, show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? 'Edit Part' : 'Add New Part'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Part</Form.Label>
            <Form.Control
              type="text"
              name="part"
              value={newPart.part}
              onChange={handlePartChange}
              placeholder="Enter part name"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Employee</Form.Label>
            <Form.Control
              type="text"
              name="employee"
              value={newPart.employee}
              onChange={handlePartChange}
              placeholder="Enter employee name"
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
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={newPart.startDate}
              onChange={handlePartChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={newPart.endDate}
              onChange={handlePartChange}
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
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleFormSubmit}>
          {isEditing ? 'Update Part' : 'Add Part'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProjectPartForm;
