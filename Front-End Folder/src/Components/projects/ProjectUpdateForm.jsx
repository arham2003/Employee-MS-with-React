import React, { useState } from "react";

function ProjectUpdateForm({ project }) {
  const [updatedProject, setUpdatedProject] = useState({
    ...project,
    startDate: project.startDate || "",
    expectedDate: project.expectedDate || "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProject({
      ...updatedProject,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can make a request to update the project data
    console.log("Updated Project:", updatedProject);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Project Name</label>
        <input
          type="text"
          name="projectName"
          value={updatedProject.projectName || ""}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label>Customer Name</label>
        <input
          type="text"
          name="customerName"
          value={updatedProject.customerName || ""}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label>Start Date</label>
        <input
          type="date"
          name="startDate"
          value={updatedProject.startDate || ""}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label>End Date</label>
        <input
          type="date"
          name="expectedDate"
          value={updatedProject.expectedDate || ""}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label>Budget</label>
        <input
          type="number"
          name="budget"
          value={updatedProject.budget || ""}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label>Status</label>
        <select
          name="status"
          value={updatedProject.status || ""}
          onChange={handleChange}
          className="form-control"
          required
        >
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Save Changes</button>
    </form>
  );
}

export default ProjectUpdateForm;
