// ProjectPhase.js
import React from "react";
import { Table, Button } from "react-bootstrap";

function ProjectPhase({ projectParts, editPart, handleDelete, handleAddPart }) {
  // Define the formatDate function within the component
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  // Check if projectParts is an array and has items
  if (!Array.isArray(projectParts) || projectParts.length === 0) {
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
          {projectParts.map((part, index) => (
            <tr key={index}>
              <td>{part.part_name || "N/A"}</td>
              <td>{part.part_id || "N/A"}</td>
              <td>{part.start_date ? formatDate(part.start_date) : "N/A"}</td>
              <td>{part.end_date ? formatDate(part.end_date) : "N/A"}</td>
              <td>{part.status || "N/A"}</td>
              <td>{part.contribution_percentage || "N/A"}</td>
              <td>
                <Button variant="info" onClick={() => editPart(part)}>
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
        onClick={handleAddPart}  // This will trigger the function to add a new project part
        style={{ marginBottom: '20px' }}
      >
        Add Project Part
      </Button>
    </div>
  );
}

export default ProjectPhase;
