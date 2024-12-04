import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SalaryForm from './SalaryForm'; // Import your SalaryForm component
import './Salaries.css';

const SalaryTracker = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('November');  // Default to current month
  const [selectedYear, setSelectedYear] = useState('2024');        // Default to current year
  const [isModalOpen, setIsModalOpen] = useState(false);           // State to control modal visibility

  // Fetch employee data from the API based on selected month and year
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/get_empPayments`, {
          params: { 
            month: selectedMonth, 
            year: selectedYear 
          }
        });
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, [selectedMonth, selectedYear]);  // Refetch data whenever month or year changes

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  // Function to open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="salary-tracker-container">
      <h2>Employee Salary Tracker</h2>

      {/* Add Salary Button */}
      <button className="add-salary-button" onClick={openModal}>Add Salary</button>

      {/* Month and Year Selection */}
      <div className="filter-container">
        <label>
          Select Month: 
          <select value={selectedMonth} onChange={handleMonthChange}>
            {months.map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </label>

        <label>
          Select Year: 
          <input 
            type="number" 
            value={selectedYear} 
            onChange={handleYearChange}
            min="2000" max={new Date().getFullYear()}
          />
        </label>
      </div>

      {/* Employee Salary Table for Selected Month */}
      <table className="employee-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Basic Salary</th>
            <th>Bonus</th>
            <th>Total Salary</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee.payment_id}>
                <td>{employee.employee_name}</td>
                <td>{employee.salary}</td>
                <td>{employee.bonus}</td>
                <td>{employee.salary + employee.bonus}</td>
                <td>{employee.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No data available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal for SalaryForm */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal-button" onClick={closeModal}>Close</button>
            <SalaryForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default SalaryTracker;
