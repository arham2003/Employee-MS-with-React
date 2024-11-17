import React, { useState } from 'react';
import './ProjectForm.css'; // Import the CSS file

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    customerName: '',
    startDate: '',
    expectedDate: '',
    budget: '',
    status: '',
    parts: [
      {
        partName: '',
        employee: '',
        department: '',
        startDate: '',
        endDate: '',
        status: '',
        contribution: ''
      }
    ]
  });

  // Handle change for main form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle change for part fields
  const handlePartChange = (index, e) => {
    const { name, value } = e.target;
    const updatedParts = [...formData.parts];
    updatedParts[index][name] = value;
    setFormData((prevState) => ({
      ...prevState,
      parts: updatedParts
    }));
  };

  // Add a new part
  const addPart = () => {
    setFormData((prevState) => ({
      ...prevState,
      parts: [
        ...prevState.parts,
        {
          partName: '',
          employee: '',
          department: '',
          startDate: '',
          endDate: '',
          status: '',
          contribution: ''
        }
      ]
    }));
  };

  // Remove a part
  const removePart = (index) => {
    const updatedParts = formData.parts.filter((_, i) => i !== index);
    setFormData((prevState) => ({
      ...prevState,
      parts: updatedParts
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // You can submit this to your backend
  };

  return (
    <div className="form-container">
      <h2>Project Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="projectName">Project Name:</label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="customerName">Customer Name:</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="expectedDate">Expected Date:</label>
          <input
            type="date"
            id="expectedDate"
            name="expectedDate"
            value={formData.expectedDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="budget">Budget:</label>
          <input
            type="number"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <h3>Project Parts</h3>

        {formData.parts.map((part, index) => (
          <div key={index} className="part-group">
            <div className="form-group">
              <label htmlFor={`partName-${index}`}>Part Name:</label>
              <input
                type="text"
                id={`partName-${index}`}
                name="partName"
                value={part.partName}
                onChange={(e) => handlePartChange(index, e)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor={`employee-${index}`}>Employee:</label>
              <input
                type="text"
                id={`employee-${index}`}
                name="employee"
                value={part.employee}
                onChange={(e) => handlePartChange(index, e)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor={`department-${index}`}>Department:</label>
              <input
                type="text"
                id={`department-${index}`}
                name="department"
                value={part.department}
                onChange={(e) => handlePartChange(index, e)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor={`startDate-${index}`}>Start Date:</label>
              <input
                type="date"
                id={`startDate-${index}`}
                name="startDate"
                value={part.startDate}
                onChange={(e) => handlePartChange(index, e)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor={`endDate-${index}`}>End Date:</label>
              <input
                type="date"
                id={`endDate-${index}`}
                name="endDate"
                value={part.endDate}
                onChange={(e) => handlePartChange(index, e)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor={`status-${index}`}>Status:</label>
              <select
                id={`status-${index}`}
                name="status"
                value={part.status}
                onChange={(e) => handlePartChange(index, e)}
                required
              >
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor={`contribution-${index}`}>Contribution (%):</label>
              <input
                type="number"
                id={`contribution-${index}`}
                name="contribution"
                value={part.contribution}
                onChange={(e) => handlePartChange(index, e)}
                required
              />
            </div>

            <button type="button" className="remove-btn" onClick={() => removePart(index)}>Remove Part</button>
          </div>
        ))}

        <button type="button" className="add-btn" onClick={addPart}>Add Part</button>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default ProjectForm;
