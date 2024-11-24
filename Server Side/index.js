import express from "express";
import cors from 'cors'
import { adminRouter } from "./Routes/AdminRoute.js";
import { EmployeeRouter } from "./Routes/EmployeeRoute.js";
import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { getAllProjects , addProject, getAllProjectParts, getProjectPartsByProjectId, getProjectById, deleteProjectPart, addProjectPart, getProjectIds, getProjectPartById, updateProjectPartById} from "./Routes/projects/projectController.js";
import { addCustomer,  deleteCustomerById, editCustomer, getAllCustomers, getCustomerById } from "./Routes/customer/customer.js";
import { addDepartment, deleteDepartment, getAllDepartments, getAllEmployees, updateDepartment } from "./Routes/departments/departments.js";

const app = express() 
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', "DELETE"],
    credentials: true
}))
app.use(express.json())
// app.use(bodyParser.json());
app.use(cookieParser())
app.use('/auth', adminRouter)
app.use('/employee', EmployeeRouter)
app.use(express.static('Public'))

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(token) {
        Jwt.verify(token, "jwt_secret_key", (err ,decoded) => {
            if(err) return res.json({Status: false, Error: "Wrong Token"})
            req.id = decoded.id;
            req.role = decoded.role;
            next()
        })
    } else {
        return res.json({Status: false, Error: "Not autheticated"})
    }
}
// -----------------------------------------------------------------------------------
app.get('/project_parts', getAllProjectParts);  // Fetch all project parts
app.get('/project_parts/:projectId', getProjectPartsByProjectId);
app.get('/api/projects/:id', getProjectById);

app.get('/projects',getAllProjects)
app.post('/projects/add',addProject)
app.delete('/api/project_parts/:partId',deleteProjectPart)
app.post('/add_projectpart/:id',addProjectPart)
app.get('/get_projectpart/:partId',getProjectPartById)
app.put('/update_projectpart/:partId',updateProjectPartById)
app.get('/get_project_ids',getProjectIds)

// Customer APIS
app.get('/get_allCustomers',getAllCustomers)
app.post('/add_customer',addCustomer)
app.delete('/delete_customer/:customerId',deleteCustomerById)
app.put('/edit_customer/:customerId',editCustomer)
app.get('/get_customerById/:id',getCustomerById)

// Departments APIS
app.get('/get_all_employees',getAllEmployees)
app.get('/get_all_departments',getAllDepartments)
app.post('/add_department',addDepartment)
app.delete('/delete_department/:departmentId', deleteDepartment);
app.put('/update_department/:id',updateDepartment)

app.get('/verify',verifyUser, (req, res)=> {
    return res.json({Status: true, role: req.role, id: req.id})
} )

app.listen(3000, () => {
    console.log("Server is running")
})