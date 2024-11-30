import con from '../../utils/db.js';  // Import the MySQL connection

export const getEmployeeAttendance = (req, res) => {
    const employeeId = req.params.employeeId;  // Get the employeeId from the URL

    const sql = `
        SELECT 
           
            COUNT(CASE WHEN status = 'Absent' THEN 1 END) AS total_absent,
            COUNT(CASE WHEN status = 'Present' THEN 1 END) AS total_present,
            COUNT(CASE WHEN status = 'Leave' THEN 1 END) AS total_leave,
            COUNT(CASE WHEN status = 'Late' THEN 1 END) AS total_late
        FROM attendance
        WHERE employee_id = ?  -- Use prepared statement for security
        GROUP BY employee_id;
    `;

    con.query(sql, [employeeId], (err, result) => {
        if (err) {
            return res.status(500).json({ Status: false, Error: "Query Error: " + err });
        }
        if (result.length === 0) {
            return res.status(404).json({ Status: false, Message: "No attendance records found for this employee" });
        }
        return res.status(200).json({ Status: true, Result: result });
    });
};
