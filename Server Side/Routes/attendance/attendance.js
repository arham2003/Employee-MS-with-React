import con from '../../utils/db.js';  // Import the MySQL connection



export const submitAttendance = (req, res) => {
    const attendanceData = req.body;

    // Check if the request body is valid and not empty
    if (!Array.isArray(attendanceData) || attendanceData.length === 0) {
        return res.status(400).json({ error: 'No attendance data received.' });
    }

    // Loop through the attendance data to validate each record
    for (let i = 0; i < attendanceData.length; i++) {
        const { employeeId, date, status } = attendanceData[i];

        // Check if employeeId, date, and status are provided
        if (!employeeId || !date || !status) {
            return res.status(400).json({ error: 'Employee ID, Date, and Status are required.' });
        }

        // Insert each record into the database
        const query = 'INSERT INTO attendance (employee_id, date, status) VALUES (?, ?, ?)';
        con.query(query, [employeeId, date, status], (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
        });
    }

    // If all records are successfully processed
    res.status(201).json({ message: 'Attendance submitted successfully' });
};

export const getAttendanceByDate = (req, res) => {
    const { date } = req.query; // Extract the date from the query parameters

    // Query to fetch attendance records for the specified date
    const query = `
        SELECT a.employeeId, e.name, a.status
        FROM attendance a
        JOIN employees e ON a.employeeId = e.id
        WHERE a.date = ?
    `;

    // Execute the query with the provided date
    con.query(query, [date], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // If no records are found, send a message indicating no records
        if (results.length === 0) {
            return res.status(404).json({ message: 'No attendance records found for the selected date.' });
        }

        // Return the attendance records
        res.status(200).json(results);
    });
};


export const getAttendanceByMonth = (req, res) => {
    const { month } = req.query; // Extract the 'month' parameter from the query string
    console.log(month)

    // Check if month is provided
    if (!month) {
        return res.status(400).json({ error: 'Month parameter is required' });
    }

    // Assuming you are using a MySQL database and have a connection (con)
    const query = `
        SELECT * FROM attendance
        WHERE DATE_FORMAT(date, '%Y-%m') = ?;
    `; // Query to get records for the specific month (e.g., '2024-11')

    // Execute the query
    con.query(query, [month], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message }); // If there is an error, return it
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'No attendance records found for the specified month' });
        }

        return res.status(200).json(results); // Send the attendance data as a JSON response
    });
};

