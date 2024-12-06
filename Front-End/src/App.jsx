import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import Employee from './Components/Employee';
import Category from './Components/Category';
import SubmittedWork from './Components/Profile';
import AddCategory from './Components/AddCategory';
import AddEmployee from './Components/AddEmployee';
import EditEmployee from './Components/EditEmployee';
import Start from './Components/Start';
import EmployeeLogin from './Components/EmployeeLogin';
import EmployeeDetail from './Components/EmployeeDetail';
import PrivateRoute from './Components/PrivateRoute';
import Projects from './Components/projects/project';
import ProjectForm from './Components/projects/ProjectForm';
import ProjectDetail from './Components/projects/ProjectDetail';
import ProjectPhaseForm from './Components/projects/ProjectPhaseForm';
import Attendance from './Components/Attendance/Attendance';
import AttendanceForm from './Components/Attendance/AttendanceForm';
import AttendanceRecords from './Components/Attendance/AttendanceRecords';
import UpdateForm from './Components/Attendance/UpdateForm';
import Customer from './Components/Customer/Customer';
import Departments from './Components/Departments/Departments';

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { EmployeeProvider } from './Components/EmployeePanel/EmployeeContext';
import AssignedWork from './Components/EmployeePanel/AssignedWork';
import EmpAttendance from './Components/EmployeePanel/EmpAttendance';
import SalaryTracker from './Components/Salaries/Salaries';

function App() {
  return (
    <EmployeeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />}></Route>
          <Route path="/adminlogin" element={<Login />}></Route>
          <Route path="/employee_login" element={<EmployeeLogin />}></Route>

          {/* Employee Detail Route */}
          <Route path="/employee_detail/:id" element={<EmployeeDetail />} />

          {/* Link to Assigned Work */}
          <Route path="/employee_detail/:id/assigned_work" element={<AssignedWork />} />

          {/* Link to Attendance */}
          <Route path="/employee_detail/:employeeId/attendance" element={<EmpAttendance />} />

          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }>
            {/* Nested Routes for Dashboard */}
            <Route path="/" element={<Home />} /> {/* Dashboard Home */}
            <Route path="employee" element={<Employee />} />
            <Route path="customer" element={<Customer />} />
            <Route path="departments" element={<Departments />} />
            <Route path="attendance" element={<AttendanceRecords />} />
            <Route path="take_attendance" element={<AttendanceForm />} />
            <Route path="update_attendance" element={<UpdateForm />} />
            <Route path="profile" element={<SubmittedWork />} />
            <Route path="projects" element={<Projects />} />
            <Route path="project_phase" element={<ProjectPhaseForm />} />
            <Route path="projectForm" element={<ProjectForm />} />
            <Route path="project/:id" element={<ProjectDetail />} />
            <Route path="add_category" element={<AddCategory />} />
            <Route path="add_employee" element={<AddEmployee />} />
            <Route path="edit_employee/:id" element={<EditEmployee />} />
            <Route path="salaries" element={<SalaryTracker />} />

          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </EmployeeProvider>
  );
}

export default App;
