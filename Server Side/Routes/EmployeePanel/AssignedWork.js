import con from '../../utils/db.js';  // Import the MySQL connection


export const getEmployeeProjectParts = (req, res) => {
    const employeeId = req.params.employeeId;  // Get the employeeId from the URL
    const sql = `
        SELECT 
            pp.part_id, 
            pp.project_id, 
            pp.part_name, 
            pp.start_date, 
            pp.end_date, 
            pp.status, 
            pp.contribution_percentage, 
            e.name AS employee_name, 
            p.projectName AS project_name
        FROM 
            project_parts pp
        JOIN 
            employee e ON pp.employee_id = e.id
        JOIN 
            projects p ON pp.project_id = p.id
        WHERE 
            pp.employee_id = ?;  -- Use prepared statement for security
    `;

    con.query(sql, [employeeId], (err, result) => {
        if (err) {
            return res.status(500).json({ Status: false, Error: "Query Error: " + err });
        }
        return res.status(200).json({ Status: true, Result: result });
    });
};
