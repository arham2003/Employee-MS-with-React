import React, { useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import EditProjectPhase from './EditProjectPhase'; // Import the EditProjectPhase component

function ProjectPhase({ projectParts, handleDelete, handleAddPart }) {
  const [editingPhase, setEditingPhase] = useState(null); // State to track the selected phase for editing
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [updatedParts, setUpdatedParts] = useState(projectParts); // State to manage updated project parts

  // Define the formatDate function within the component
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  // Function to handle phase editing (triggered when Edit is clicked)
  const handleEditClick = (part) => {
    setEditingPhase(part);  // Set the selected phase to edit
    setShowModal(true);     // Open the modal
  };

  // Function to handle updating the phase
  const handleUpdatePhase = (updatedPhase) => {
    // Update the phase in the state
    setUpdatedParts((prevParts) =>
      prevParts.map((part) =>
        part.part_id === updatedPhase.part_id ? updatedPhase : part
      )
    );
    setShowModal(false); // Close the modal after update
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);     // Close the modal
    setEditingPhase(null);   // Clear the editing state
  };

  // Check if projectParts is an array and has items
  if (!Array.isArray(updatedParts) || updatedParts.length === 0) {
    return <p>No project parts available.</p>;
  }

  return (
    <div>
      <h5>Project Parts</h5>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Phase</th>
            <th>Employee</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Contribution (%)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {updatedParts.map((part, index) => (
            <tr key={index}>
              <td>{part.part_name || "N/A"}</td>
              <td>{part.part_id || "N/A"}</td>
              <td>{part.start_date ? formatDate(part.start_date) : "N/A"}</td>
              <td>{part.end_date ? formatDate(part.end_date) : "N/A"}</td>
              <td>{part.status || "N/A"}</td>
              <td>{part.contribution_percentage || "N/A"}</td>
              <td>
                <Button variant="info" onClick={() => handleEditClick(part)}>
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(part.part_id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Project Part Button */}
      <Button
        variant="primary"
        onClick={handleAddPart}
        style={{ marginBottom: '20px' }}
      >
        Add Project Part
      </Button>

      {/* Modal for editing project phase */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Project Phase</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingPhase ? (
            <EditProjectPhase
              phase={editingPhase}
              onUpdate={handleUpdatePhase} // Use the internal update handler
            />
          ) : (
            <p>Loading...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProjectPhase;
